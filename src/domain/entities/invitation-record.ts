export interface InvitationRecord {
  readonly id: string;
  readonly inviteeId: string;
  readonly createdAt: string;
  readonly inviteeName?: string;
  readonly inviteeAvatar?: string;
  readonly inviterName?: string;
  readonly inviterAvatar?: string;
}
