import App from "../App";
import { EntryScreen } from "../screens";

const ROUTES = [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: EntryScreen
      }
    ]
  }
];

export default ROUTES;
