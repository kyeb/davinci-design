from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from .setup import Base, engine


class ProjectModel(Base):
    __tablename__ = "projects"
    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str]

    def __repr__(self):
        return f"Project(id={self.id!r}, name={self.name!r})"


Base.metadata.create_all(bind=engine)
