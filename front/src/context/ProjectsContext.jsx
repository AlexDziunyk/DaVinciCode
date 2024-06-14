import React, { createContext, useState, useContext, useEffect } from 'react';

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [project, setProject] = useState("");

  return (
    <ProjectsContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}


export function useProjects() {
  return useContext(ProjectsContext);
}