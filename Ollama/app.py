import os
from dotenv import load_dotenv
load_dotenv()

from langchain_community.llms import Ollama
import streamlit as st
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser


os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")
os.environ["LANGCHAIN_TACing_V2"] = true
os.environ["LANGCHAIN_PROJECT"] = os.getenv("LANGCHAIN_PROJECT")


prompt = ChatPromptTemplate.from_messages([
    (
        "system", "You are a helpful assistant .Please respond to questions being asked by the user."
    )
    ("user", "Question: {question}"),
]

)

st.title("Ollama LLM Chatbot")
input_text = st.text_input("Enter the question what you want to ask?")


## Ollama3 LLM
llm = Ollama(model = "llama3")
output_parser = StrOutputParser()
chain = prompt | llm | output_parser

if input_text:
    st.write(chain.invoke({"question": input_text}))
