import meta        from '../content/scrapy/meta.yaml';
import podstawy    from '../content/scrapy/podstawy.yaml';
import spiders     from '../content/scrapy/spiders.yaml';
import selektory   from '../content/scrapy/selektory.yaml';
import pipelines   from '../content/scrapy/pipelines.yaml';
import middleware  from '../content/scrapy/middleware.yaml';
import rivals      from '../content/scrapy/rivals.yaml';
import feeds       from '../content/scrapy/feeds.yaml';
import komendy     from '../content/scrapy/komendy.yaml';

export const FW_SCRAPY_DATA = {
  meta,
  tabs: meta.tabs,
  content: {
    podstawy,
    komponenty: spiders,
    hooki:      selektory,
    routing:    pipelines,
    state:      middleware,
    rywale:     rivals,
    pluginy:    feeds,
    komendy,
  }
};
