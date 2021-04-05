import { TypePolicy } from "@apollo/client";

const RecipeTypePolicy: TypePolicy = {
  fields: {
    date: {
      merge: (existing, incoming) => {
        return { ...existing, ...incoming };
      },
    },
    time: {
      merge: (existing, incoming) => {
        return { ...existing, ...incoming };
      },
    },
  },
};

export default RecipeTypePolicy;
