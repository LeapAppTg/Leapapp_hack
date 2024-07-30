import { ApiTypeBuilder } from "@builders"

export type InviteLinkApi = {
    invite_link: string
}

export type InviteLink = {
    inviteLink: string
}

export const InviteLinkApiTypeBuilder = new ApiTypeBuilder<InviteLinkApi, InviteLink>(
    (i) => ({
        inviteLink: i.invite_link
    })
)