import { Request, Response } from "express";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;
    const usersRepository = UsersRepository.getInstance();
    const showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository);
    try {
      const profile = showUserProfileUseCase.execute({ user_id });
      return response.status(200).json(profile);
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }
}

export { ShowUserProfileController };
