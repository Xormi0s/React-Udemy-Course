import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

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

  console.log(projectState);

  let content;
  
  if (projectState.selectedProject === null) {
    content = <NewProject  onAdd={handleAddProject}/>
  } else if (projectState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }

  function handleAddProject(projectData){
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      };

      return {
        ...prevState,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar onStartAddProject={handleStartAddProject}/>
        {content}
      </main>
    </>
  );
}

export default App;
