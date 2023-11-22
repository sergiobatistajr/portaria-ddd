import { Request, Response } from "express"
import FindFilteredUsers from "../core/application/usecase/FindFilteredUsers"
import CountUsersPage from "../core/application/usecase/CountUsersPage"
import UpdateUser from "../core/application/usecase/UpdateUser"
import FindUserById from "../core/application/usecase/FindUserById"
interface Usecases {
  findFilteredUsers: FindFilteredUsers
  countUsersPage: CountUsersPage
  updateUser: UpdateUser
  findUserById: FindUserById
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
  async updateUser(input: Input): Promise<Response> {
    const { req, res } = input
    const { id } = req.params
    const { name, email, role, status } = req.body
    await this.usecase.updateUser.execute({ id, name, email, role, status })
    return res.status(200).end()
  }
  async findUserById(input: Input): Promise<Response> {
    const { req, res } = input
    const { id } = req.params
    const user = await this.usecase.findUserById.execute(id)
    return res.status(200).json(user)
  }
}

type Input = {
  req: Request
  res: Response
}

type Output = Response
