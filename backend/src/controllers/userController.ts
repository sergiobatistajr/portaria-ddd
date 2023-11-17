import { Request, Response } from "express"
import FindFilteredUsers from "../core/application/usecase/FindFilteredUsers"

export default class UserController {
  private static instance: UserController
  private constructor(private findFilteredUsers: FindFilteredUsers) {}
  public static getInstance(
    findFilteredUsers: FindFilteredUsers
  ): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController(findFilteredUsers)
    }
    return UserController.instance
  }
  async findFiltered(request: Request, response: Response): Promise<Response> {
    const { query, currentPage } = request.body

    try {
      const users = await this.findFilteredUsers.execute(
        query ?? "",
        currentPage ?? 1
      )
      return response.status(201).json({ users })
    } catch (err) {
      if (err instanceof Error)
        return response
          .status(400)
          .json({ message: err.message || "Unexpected error." })
    }
    return response.status(500).send()
  }
}
