from fastapi import FastAPI
from davinci_backend.graphql.schema import schema
from strawberry.fastapi import GraphQLRouter

graphql_router = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_router, prefix="/graphql")
