import { v4 as uuidv4 } from "uuid";
import UseLocalStorageState from "./hooks/UseLocalStorageState.js";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const localStorageKey = "managementProjectState";
  const [projectsState, setProjectsState] = UseLocalStorageState(
    localStorageKey,
    {
      selectedProjectId: undefined,
      projects: [],
      tasks: {},
    }
  );

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = uuidv4();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      const updatedProjectTasks = {
        ...prevState.tasks,
        [prevState.selectedProjectId]: [
          newTask,
          ...(prevState.tasks[prevState.selectedProjectId] || []),
        ],
      };

      return {
        ...prevState,
        tasks: updatedProjectTasks,
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      const updatedProjectTasks = {
        ...prevState.tasks,
        [prevState.selectedProjectId]: prevState.tasks[
          prevState.selectedProjectId
        ].filter((task) => task.id !== id),
      };
      return {
        ...prevState,
        tasks: updatedProjectTasks,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = uuidv4();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
