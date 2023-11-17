import { Request, Response } from "express"
import FindFilteredUsers from "../core/application/usecase/FindFilteredUsers"
import CountUsersPage from "../core/application/usecase/CountUsersPage"

export default class UserController {
  constructor(
    private readonly findFilteredUsersUsecase: FindFilteredUsers,
    private readonly countUsersPageUsecase: CountUsersPage
  ) {}

  async findFilteredUsers(req: Request, res: Response): Promise<Response> {
    const { query = "", currentPage = 1 } = req.query
    const users = await this.findFilteredUsersUsecase.execute(
      query as string,
      Number(currentPage)
    )

    return res.status(200).json({ users })
  }
  async countUsersPage(req: Request, res: Response): Promise<Response> {
    const { query = "" } = req.query
    const totalPages = await this.countUsersPageUsecase.execute(query as string)
    return res.status(200).json({ totalPages })
  }
}
