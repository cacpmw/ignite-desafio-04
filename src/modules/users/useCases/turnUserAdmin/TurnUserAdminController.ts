import { Request, Response } from "express";

import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;
    const usersRepository = UsersRepository.getInstance();
    const turnUserAdminUseCase = new TurnUserAdminUseCase(usersRepository);
    try {
      const user = turnUserAdminUseCase.execute({ user_id });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }
}

export { TurnUserAdminController };
