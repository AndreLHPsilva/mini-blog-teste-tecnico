export function verifyIsMyComment({ session, comment }) {
  const auth_user_id = session?.user.id;

  const user_id_by_comment = comment?.user_id;

  if (auth_user_id == user_id_by_comment) {
    return true;
  }

  return false;
}
