import { useState } from "react";
import "./App.css";
import FirstImage from "./assets/images/first.png";
import ThirdImage from "./assets/images/third.png";
import Edit from "./assets/icons/edit.png";
import Reply from "./assets/icons/reply.png";
import Delete from "./assets/icons/delete.png";

function App() {
  const [num, setNum] = useState(0);

  const increment = () => {
    setNum(num + 1);
  };

  const decrement = () => {
    setNum(num - 1);
  };
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "amyrobson",
      image: FirstImage,
      time: "1 month ago",
      text: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
      replies: [],
    },
  ]);

  const [replyVisible, setReplyVisible] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingReplyText, setEditingReplyText] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const toggleReply = (id, userName) => {
    setReplyVisible(replyVisible === id ? null : id);
    if (replyVisible !== id) {
      setReplyText(`@${userName} `);
    }
  };

  const handleReplySubmit = (commentId) => {
    if (replyText.trim() === "") return;

    const newReply = {
      id: Date.now(),
      user: "YOU",
      image: ThirdImage,
      text: replyText,
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
    setReplyText("");
    setReplyVisible(null);
  };

  const handleNewCommentSubmit = () => {
    if (newCommentText.trim() === "") return;

    const newComment = {
      id: Date.now(),
      user: "YOU",
      image: ThirdImage,
      time: "Just now",
      text: newCommentText,
      replies: [],
    };
    setComments([...comments, newComment]);
    setNewCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    setDeletingCommentId(commentId);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletingCommentId)
    );
    setShowConfirmDelete(false);
    setDeletingCommentId(null);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setDeletingCommentId(null);
  };

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
    const comment = comments.find((comment) => comment.id === commentId);
    setEditingText(comment.text);
  };

  const handleSaveEdit = (commentId) => {
    if (editingText.trim() === "") return;
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, text: editingText } : comment
      )
    );
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleEditReply = (commentId, replyId) => {
    const comment = comments.find((comment) => comment.id === commentId);
    const reply = comment.replies.find((reply) => reply.id === replyId);
    setEditingReplyText(reply.text);
  };

  const handleSaveReplyEdit = (commentId, replyId) => {
    if (editingReplyText.trim() === "") return;

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, text: editingReplyText }
                  : reply
              ),
            }
          : comment
      )
    );
    setEditingReplyText("");
  };

  const handleDeleteReply = (commentId, replyId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.filter((reply) => reply.id !== replyId),
            }
          : comment
      )
    );
  };

  return (
    <div className="container ms-auto p-3 justify-center items-center container mx-auto flex flex-col bg-[#F5F6FA] w-auto rounded-[10px] gap-[20px] max-w-full md:max-w-[90%] lg:max-w-[80%]">
      <div className="comments-container max-h-[500px] overflow-y-auto w-full">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="w-full max-w-[730px] bg-white rounded-lg p-4 flex md:flex-row items-start gap-4"
          >
            <div className="flex flex-col items-center bg-[#F5F6FA] rounded-lg px-3 py-2">
              <button
                onClick={increment}
                className="text-lg font-bold text-gray-500"
              >
                +
              </button>
              <span className="text-[#5357B6] font-bold text-lg">{num}</span>
              <button
                onClick={decrement}
                className="text-lg font-bold text-gray-500"
              >
                -
              </button>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
                <img src={comment.image} className="w-8 h-8 rounded-full" />
                <h1 className="hover:text-[#C5C6EF] font-bold text-[#334253]">
                  {comment.user === "YOU" ? "YOU" : comment.user}
                </h1>
                <span className="text-[#67727E] text-sm text-nowrap">
                  {comment.time}
                </span>
                <div
                  className="md:ml-auto flex items-center gap-2 cursor-pointer"
                  onClick={() =>
                    comment.user !== "YOU" &&
                    toggleReply(comment.id, comment.user)
                  }
                >
                  {comment.user !== "YOU" && (
                    <>
                      <img src={Reply} className="w-4 h-4" />
                      <span className="font-bold text-[#5357B6]">Reply</span>
                    </>
                  )}
                </div>
                {comment.user === "YOU" && (
                  <div className="ml-2 flex gap-2 items-center">
                    <img
                      src={Delete}
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleDeleteComment(comment.id)}
                    />
                    <p className="text-[red]">DELETE</p>
                    <img
                      src={Edit}
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleEditComment(comment.id)}
                    />
                    <p className="text-[#5357B6]">EDIT</p>
                  </div>
                )}
              </div>

              {editingCommentId === comment.id ? (
                <div className="mt-2">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full border rounded-lg p-2"
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      minHeight: "50px",
                      resize: "vertical",
                    }}
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      className="bg-[#5357B6] text-white px-4 py-2 rounded-lg"
                      onClick={() => handleSaveEdit(comment.id)}
                    >
                      UPDATE
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  className="text-[#67727E] mt-2 text-sm md:text-base"
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {comment.text}
                </p>
              )}

              {replyVisible === comment.id && (
                <div className="mt-3 flex gap-3">
                  <input
                    className="w-full border rounded-lg p-2"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      minHeight: "50px",
                      resize: "vertical",
                    }}
                  />
                  <button
                    className="hover:text-[white] hover:bg-[#C5C6EF] bg-[#5357B6] text-white px-4 py-2 rounded-lg"
                    onClick={() => handleReplySubmit(comment.id)}
                  >
                    REPLY
                  </button>
                </div>
              )}

              <div className="replies-container mt-3">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="mt-3 flex gap-4 items-start">
                    <img
                      src={reply.image}
                      className="w-8 h-8 rounded-full"
                      alt="Replyer"
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-2 items-center">
                        <h1 className="font-bold text-[#334253]">
                          {reply.user}
                        </h1>
                        {reply.user === "YOU" && (
                          <div className="ml-auto flex gap-2 items-center">
                            <img
                              src={Delete}
                              className="w-4 h-4 cursor-pointer"
                              onClick={() =>
                                handleDeleteReply(comment.id, reply.id)
                              }
                            />
                            <p className="text-[red]">DELETE</p>
                            <img
                              src={Edit}
                              className="w-4 h-4 cursor-pointer"
                              onClick={() =>
                                handleEditReply(comment.id, reply.id)
                              }
                            />
                            <p className="hover:text-[#C5C6EF] text-[#5357B6]">
                              EDIT
                            </p>
                          </div>
                        )}
                      </div>
                      <p
                        className="text-[#67727E] text-sm md:text-base mt-2"
                        style={{
                          wordBreak: "break-all",
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {reply.text}
                      </p>
                      {editingReplyText && (
                        <div className="mt-2">
                          <textarea
                            value={editingReplyText}
                            onChange={(e) =>
                              setEditingReplyText(e.target.value)
                            }
                            className="w-full border rounded-lg p-2"
                            style={{
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                              minHeight: "50px",
                              resize: "vertical",
                            }}
                          />
                          <button
                            className="bg-[#5357B6] text-white px-4 py-2 rounded-lg mt-2"
                            onClick={() =>
                              handleSaveReplyEdit(comment.id, reply.id)
                            }
                          >
                            UPDATE
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showConfirmDelete && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] flex flex-col gap-3 text-[24px]">
            <h1>Delete comment</h1>
            <p className="text-[16px] text-[#67727E]">
              Are you sure you want to delete this comment? This will remove the
              comment and can’t be undone.
            </p>
            <div className="mt-4 flex justify-between gap-4">
              <button
                className="text-[16px] text-white bg-[#67727E] text-white px-4 py-2 rounded-lg w-full"
                onClick={cancelDelete}
              >
                NO, CANCEL
              </button>
              <button
                className="text-[16px] text-white bg-[#ED6368] text-black px-4 py-2 rounded-lg w-full"
                onClick={confirmDelete}
              >
                YES, DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[730px] h-auto bg-white rounded-lg p-4 flex gap-4">
        <img className="w-[40px] h-[40px]" src={ThirdImage} />
        <textarea
          style={{
            width: "100%",
            minHeight: "50px",
            resize: "vertical",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
          className="w-full border rounded-lg p-2"
          placeholder="Add a comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button
          className="hover:text-[white] hover:bg-[#C5C6EF] bg-[#5357B6] text-white px-4 py-2 rounded-lg"
          onClick={handleNewCommentSubmit}
        >
          SEND
        </button>
      </div>
    </div>
  );
}

export default App;
