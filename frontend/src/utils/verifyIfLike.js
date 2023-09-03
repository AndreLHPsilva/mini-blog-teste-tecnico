export function verifyIfLike({ item, session, type = "article" }) {
  if (session) {
    const likesByUser = whichDataToGet({type, session});

    const variable = `${type}_id`;

    const verifyIfLiked = likesByUser?.find(
      (like) => like[variable] == item?.id
    );

    return !!verifyIfLiked;
  } else {
    return false;
  }
}

function whichDataToGet({type, session}){
  switch (type) {
    case "comment":
      return session.user?.LikesComments;
  
    default:
      return session.user?.likes;
  }
}
