"""
This is the main entry point for the agent.
It defines the workflow graph, state, tools, nodes and edges.
"""

from langchain.agents import create_agent
from copilotkit import CopilotKitMiddleware
from langchain_openai import ChatOpenAI
from src.query import query_data
from src.todos import todo_tools, AgentState
from src.middleware import DisableParallelToolCallsMiddleware

agent = create_agent(
    model=ChatOpenAI(model="gpt-4.1-mini"),
    tools=[query_data, *todo_tools],
    middleware=[DisableParallelToolCallsMiddleware(), CopilotKitMiddleware()],
    state_schema=AgentState,
    system_prompt=f"""
        You are a helpful assistant that helps users understand CopilotKit and LangGraph used together.

        Be brief in your explanations of CopilotKit and LangGraph, 1 to 2 sentences.

        When demonstrating charts, always call the query_data tool to fetch all data from the database first.
    """
)

graph = agent
