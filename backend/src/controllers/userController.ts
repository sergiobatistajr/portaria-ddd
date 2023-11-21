import { Request, Response } from "express"
import FindFilteredUsers from "../core/application/usecase/FindFilteredUsers"
import CountUsersPage from "../core/application/usecase/CountUsersPage"
interface Usecases {
  findFilteredUsers: FindFilteredUsers
  countUsersPage: CountUsersPage
}
export default class UserController {
  constructor(private readonly usecase: Usecases) {}

  async findFilteredUsers(input: Input): Promise<Output> {
    const { req, res } = input
    const { query = "", currentPage = 1 } = req.query
    const users = await this.usecase.findFilteredUsers.execute(
      query as string,
      Number(currentPage)
    )

    return res.status(200).json(users)
  }
  async countUsersPage(input: Input): Promise<Output> {
    const { req, res } = input
    const { query = "" } = req.query
    const totalPages = await this.usecase.countUsersPage.execute(
      query as string
    )
    return res.status(200).json(totalPages)
  }
}

type Input = {
  req: Request
  res: Response
}

type Output = Response
