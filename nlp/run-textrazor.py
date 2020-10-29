import textrazor
import json
import sys
import csv

textrazor.api_key = open("key").read().strip()

def configure_client():
    client = textrazor.TextRazor(extractors=["entities", "topics"])
    client.set_cleanup_mode("cleanHTML")
    client.set_classifiers(["textrazor_newscodes"])

    return client


def extract_entities(response):
    entities = list(response.entities())
    entities.sort(key=lambda x: x.relevance_score, reverse=True)
    seen = set()

    for entity in entities:
       if entity.id not in seen:
           print(entity.id, entity.relevance_score, entity.confidence_score, entity.freebase_types)
           seen.add(entity.id)



def extract_topics(response):
    topics = [topic.label for topic in response.topics if topic.score > 0.3]
    return topics

def extract_categories(response):
    categories = []
    
    for category in response.categories():
        categories.append({
            "id": category.category_id,
            "label": category.label,
            "score": category.score
        })
    return categories

client = configure_client()

skip = True
skip_url = "https://www.nation.co.ke/kenya/news/ruling-paves-way-for-building-of-kenya-s-largest-dam-95218"
with open(sys.argv[1]) as fp, open("enriched_articles.json", "a") as wp:
    reader = csv.DictReader(fp)
    for row in reader:
        url = row["url"]
        if url == skip_url:
            skip = False

        if skip:
            continue

        print(url)
        response = client.analyze_url(url)
        if response.ok:
            row["categories"] = [c.json for c in response.categories()]
            row["coarse_topics"] = [c.json for c in response.coarse_topics()]
            row["entailments"] = [c.json for c in response.entailments()]
            row["entities"] = [c.json for c in response.entities()]
            row["relations"] = [c.json for c in response.relations()]
            row["topics"] = [c.json for c in response.topics()]
            row["cleaned_text"] = response.cleaned_text
            wp.write(json.dumps(row))
            wp.write("\n")
        else:
            sys.stderr.write(f"%s\n" % response.error)
