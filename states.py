from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional

class File(BaseModel):
    path: str = Field(description="The path to the file to be created or modified")
    purpose: str = Field(description="The purpose of the file, e.g. 'main application logic', 'data processing', etc.")


class Plan(BaseModel):
    model_config = ConfigDict(extra='forbid')  # ADD THIS LINE

    name: str = Field(description="The name of app to be built")
    description: str = Field(description="A oneline description of the app to be built, e.g. 'A web application for managing personal finances'")
    features: List[str] = Field(description="A List of features that the app should have, e.g. 'user authentication', data visualization', etc.")
    tech_stack: List[str] = Field(description="The tech stack to be used for the app, e.g. 'python', 'javascript', 'react', 'flask', etc.")
    files: List[File] = Field(
        description="A List of files to be created, each with a 'path' and 'purpose'")


class ImplementationStep(BaseModel):
    model_config = ConfigDict(extra='forbid')  # ADD THIS LINE

    task_description: str = Field(description="Description of the task")
    filepath: str = Field(description="Path to the file to create/modify")
    dependencies: List[str] = Field(default_factory=list, description="Dependencies for this step")


class TaskPlan(BaseModel):
    model_config = ConfigDict(extra='forbid')  # ADD THIS LINE

    plan: Optional[Plan] = None
    implementation_steps: List[ImplementationStep] = Field(description="Ordered list of implementation steps")


class CoderState(BaseModel):
    model_config = ConfigDict(extra='forbid')  # ADD THIS LINE

    task_plan: TaskPlan
    current_step_idx: int = Field(default=0, description="Current step being executed")