import { SecureUser } from "../../models/user";

export const isAllowedToSaveRecipe = (user: SecureUser) => {
  return !!user?.user?.referenceId;
}