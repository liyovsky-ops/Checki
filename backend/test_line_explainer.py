"""
10 testów line-explainera na różnych poziomach złożoności.
"""
import requests, json, textwrap

URL = "http://localhost:8000/line-tooltip/explain"

TESTY = [
    # 1 — prosta funkcja
    {
        "nazwa": "1. Prosta funkcja",
        "line_number": 2,
        "code": textwrap.dedent("""\
            def powitaj(imie):
                wiadomosc = f"Cześć, {imie}!"
                print(wiadomosc)

            powitaj("Łukasz")
        """),
    },
    # 2 — klasa z metodą
    {
        "nazwa": "2. Metoda klasy",
        "line_number": 8,
        "code": textwrap.dedent("""\
            class Koszyk:
                def __init__(self):
                    self.produkty = []
                    self.rabat = 0

                def dodaj(self, produkt, cena):
                    self.produkty.append({"produkt": produkt, "cena": cena})

                def suma(self):
                    total = sum(p["cena"] for p in self.produkty)
                    return total * (1 - self.rabat)
        """),
    },
    # 3 — list comprehension
    {
        "nazwa": "3. List comprehension",
        "line_number": 3,
        "code": textwrap.dedent("""\
            liczby = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

            parzyste_kwadraty = [x**2 for x in liczby if x % 2 == 0]

            print(parzyste_kwadraty)
        """),
    },
    # 4 — dekorator
    {
        "nazwa": "4. Dekorator",
        "line_number": 1,
        "code": textwrap.dedent("""\
            def tylko_admin(funkcja):
                def wrapper(uzytkownik, *args, **kwargs):
                    if uzytkownik.get("rola") != "admin":
                        raise PermissionError("Brak dostępu")
                    return funkcja(uzytkownik, *args, **kwargs)
                return wrapper

            @tylko_admin
            def usun_uzytkownika(uzytkownik, id_do_usuniecia):
                print(f"Usuwam użytkownika {id_do_usuniecia}")
        """),
    },
    # 5 — async/await
    {
        "nazwa": "5. Async/await",
        "line_number": 5,
        "code": textwrap.dedent("""\
            import asyncio

            async def pobierz_dane(url):
                await asyncio.sleep(1)
                return f"dane z {url}"

            async def main():
                wyniki = await asyncio.gather(
                    pobierz_dane("api/users"),
                    pobierz_dane("api/orders"),
                )
                print(wyniki)
        """),
    },
    # 6 — zagnieżdżone warunki
    {
        "nazwa": "6. Złożone warunki zagnieżdżone",
        "line_number": 6,
        "code": textwrap.dedent("""\
            def klasyfikuj_uzytkownika(wiek, punkty, subskrypcja):
                if wiek < 18:
                    return "junior"
                else:
                    if subskrypcja == "premium":
                        if punkty > 1000:
                            return "vip"
                        else:
                            return "premium"
                    else:
                        if punkty > 500:
                            return "aktywny"
                        return "podstawowy"
        """),
    },
    # 7 — realny kod: sentinel_sr._sr_result_summary
    {
        "nazwa": "7. Realny kod — składanie opisu artykułu prawnego",
        "line_number": 10,
        "code": textwrap.dedent("""\
            def _sr_result_summary(sr_result: dict) -> str:
                parts = []
                kodeks  = sr_result.get("kodeks")
                artykul = sr_result.get("artykul")
                if kodeks and artykul:
                    parts.append(f"Artykuł: {kodeks} Art.{artykul}")
                fraza = sr_result.get("fraza_prawna", "")
                if fraza:
                    parts.append(f"Fraza: {fraza.split('|')[0].strip()}")
                sim = sr_result.get("sim_final") or sr_result.get("similarity")
                if sim is not None:
                    parts.append(f"Similarity: {float(sim):.3f}")
                kandydaci = sr_result.get("kandydaci", [])
                if kandydaci:
                    labels = [k.get("label") for k in kandydaci[:3]]
                    parts.append("Kandydaci: " + " | ".join(labels))
                return "\\n".join(parts) if parts else repr(sr_result)
        """),
    },
    # 8 — realny kod: graph_rag stałe + komentarze domenowe
    {
        "nazwa": "8. Realny kod — stałe grafu prawnego",
        "line_number": 3,
        "code": textwrap.dedent("""\
            DATABASE_URL = os.environ['DATABASE_URL']

            MIN_WYSTAPIEN = 10
            MAX_NEIGHBORS = 5
            ALLOWED_KODEKS = {'KK', 'KW', 'KC', 'KP', 'KRO', 'KSH'}

            def get_neighbors(art_nr: str, kodeks: str, conn=None) -> list[dict]:
                cur = conn.cursor()
                cur.execute(\"\"\"
                    SELECT art_do, liczba_wystapien
                    FROM graf_relacji_normatywnych
                    WHERE art_od = %s AND kodeks_od = %s
                    AND liczba_wystapien >= %s
                    ORDER BY liczba_wystapien DESC LIMIT %s
                \"\"\", (art_nr, kodeks, MIN_WYSTAPIEN, MAX_NEIGHBORS))
                return [{"art": r[0], "waga": r[1]} for r in cur.fetchall()]
        """),
    },
    # 9 — realny kod: input_agent progi decyzyjne
    {
        "nazwa": "9. Realny kod — progi decyzyjne agenta prawnego",
        "line_number": 4,
        "code": textwrap.dedent("""\
            THRESHOLD_PEWNOSC    = 0.65
            THRESHOLD_DOPYTAJ    = 0.45
            THRESHOLD_ELIMINACJA = 0.50
            MAX_ELIM_ROUNDS      = 2

            def kwalifikuj(sim_score, kandydaci):
                if sim_score >= THRESHOLD_PEWNOSC:
                    return "PEWNOSC"
                elif sim_score >= THRESHOLD_DOPYTAJ:
                    if len(kandydaci) == 1 and sim_score >= THRESHOLD_ELIMINACJA:
                        return "PEWNOSC"
                    return "DOPYTAJ"
                else:
                    return "BRAK"
        """),
    },
    # 10 — generator + yield (trudny)
    {
        "nazwa": "10. Generator z yield",
        "line_number": 6,
        "code": textwrap.dedent("""\
            def czytaj_logi_partiami(sciezka, rozmiar_paczki=100):
                bufor = []
                with open(sciezka, "r", encoding="utf-8") as f:
                    for linia in f:
                        bufor.append(linia.strip())
                        if len(bufor) >= rozmiar_paczki:
                            yield bufor
                            bufor = []
                if bufor:
                    yield bufor

            for paczka in czytaj_logi_partiami("app.log"):
                print(f"Przetwarzam {len(paczka)} linii")
        """),
    },
]


def run():
    print("=" * 60)
    print("TESTY LINE-EXPLAINERA — 10 poziomów złożoności")
    print("=" * 60)

    for test in TESTY:
        print(f"\n{'─'*60}")
        print(f"TEST: {test['nazwa']}")
        print(f"Kliknięta linia: {test['line_number']}")
        print(f"{'─'*60}")

        try:
            res = requests.post(URL, json={
                "code": test["code"],
                "line_number": test["line_number"],
            }, timeout=30)
            d = res.json()
            print(f"BLOK:         {d.get('blok', '—')}")
            print(f"WYJAŚNIENIE:  {d.get('wyjasnienie', '—')}")
        except Exception as e:
            print(f"BŁĄD: {e}")

    print(f"\n{'='*60}")
    print("Koniec testów.")


if __name__ == "__main__":
    run()
