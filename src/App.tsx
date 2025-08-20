import useInitialize from "./useInitialize.ts";
import PetsList, {PetAvailability} from "./PetsList.tsx";
import {RouterProvider, createBrowserRouter} from 'react-router'
import HomeComponent from "./HomeComponent.tsx";
import PetDetails from "./PetDetails.tsx";
import PetFormComponent from "./PetFormComponent.tsx";

export const petDetailsPath = "/pets/";
export const archivePath = "/archive";
export const petFormPath = "/form"

function App() {

    useInitialize();
  return (
      <RouterProvider router ={createBrowserRouter([
          {
              path: "/",
              element: <HomeComponent/>,
              children: [
                  {
                      path: "/",
                      element: <PetsList availability={PetAvailability.AVAILABLE} />
                  },
                  {
                      path: petDetailsPath + ":petId",
                      element: <PetDetails/>
                  },
                  {
                      path: archivePath,
                      element: <PetsList availability={PetAvailability.SOLD} />
                  },
                  {
                      path: petFormPath,
                      element: <PetFormComponent/>
                  }
                  ]
               }

      ])}>
    </RouterProvider>
  )
}

export default App
