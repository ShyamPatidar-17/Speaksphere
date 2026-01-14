from fastapi import FastAPI
from pydantic import BaseModel
from textblob import TextBlob

app = FastAPI()

class TextIn(BaseModel):
    text: str

@app.post("/analyze")
def analyze(data: TextIn):
    polarity = TextBlob(data.text).sentiment.polarity
    return { "sentiment": polarity }