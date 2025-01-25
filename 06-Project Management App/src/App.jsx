import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectState, setProjectState] = useState({selectedProject: undefined, projects: [], tasks: []});

  function handleStartAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProject);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks} />;
  
  if (projectState.selectedProject === null) {
    content = <NewProject  onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if (projectState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }

  function handleAddProject(projectData){
    setProjectState(prevState => {
      const projectID = Math.random();
      const newProject = {
        ...projectData,
        id: projectID
      };

      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleCancelAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProject: undefined,
      };
    });
  }

  function handleSelectProject(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProject: id,
      };
    });
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProject)
      };
    });
  }

  function handleAddTask(text){
    setProjectState(prevState => {
      const taskID = Math.random();
      const newTask = {
        text: text,
        id: taskID,
        projectID: prevState.selectedProject,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      };
    });
  }

  function handleDeleteTask(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectState.projects} onSelectProject={handleSelectProject} selectedProjectID={projectState.selectedProject}/>
        {content}
      </main>
    </>
  );
}

export default App;
