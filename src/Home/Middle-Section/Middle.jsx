import React, { useContext } from "react";
import Card from "./Card.jsx";
import Comment from "../First-section/Profile/Comment.jsx";
import { ContextComponent } from "../../App.jsx";

function Middle({ post }) {
  const { comment, setComment } = useContext(ContextComponent);

  return (
    <>
      <div className="middle-section">
        <div id="for-you">
          <span id="for-you-span">For You</span>
        </div>

        {
          <div className="card-main">
            {post?.map((item) => {
              return (
                item?.post &&
                item?.post.length !== 0 && (
                  <div key={item?.id}>
                    {item?.post?.map((postItem) => {
                      return (
                        <div key={postItem.post_id}>
                          <Card
                            username={item?.username}
                            profile={item?.profile}
                            post_description={postItem?.post_description}
                            post_image={postItem?.post_image}
                            post_id={postItem?.post_id}
                            setComment={setComment}
                            comment={comment}
                          />
                          {comment === postItem?.post_id && (
                            <Comment
                              currPost={postItem}
                              currPostAccount={item}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )
              );
            })}
          </div>
        }
      </div>
    </>
  );
}

export default Middle;
