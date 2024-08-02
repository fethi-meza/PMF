import React from "react";
import ToggleColorModeButton from "./theme/theme";
import Add from "./Components/Vache/AddVache";
import Home from './page/Home';
import Sante from './page/Sante';
import Valge from './page/Valge';
import ProductionLait from './page/production_lait';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <>
          <ToggleColorModeButton />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={Add} />
            <Route path="/ExmaSante/:id_vache" component={Sante} />
            <Route path="/Valge/:id_vache" component={Valge} />
            <Route path="/ProductionLait/:id_vache" component={ProductionLait} />
          </Switch>
        </>
      </Router>
    </ChakraProvider>
  );
};

export default App;
