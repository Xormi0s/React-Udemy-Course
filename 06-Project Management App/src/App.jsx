import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectState, setProjectState] = useState({selectedProject: undefined, projects: []});

  function handleStartAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProject);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject}/>;
  
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

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectState.projects} onSelectProject={handleSelectProject}/>
        {content}
      </main>
    </>
  );
}

export default App;
