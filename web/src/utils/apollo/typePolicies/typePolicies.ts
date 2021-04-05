import { TypePolicies } from "@apollo/client";
import QueryTypePolicy from "./query";
import RecipeTypePolicy from "./recipe";

const typePolicies: TypePolicies = {
  Recipe: RecipeTypePolicy,
  Query: QueryTypePolicy,
};

export default typePolicies;
