import { request } from "@/services/api/request";
import { uploadToBlob } from "@/services/api/uploadToBlob";
import { MEDIA_TYPES } from "@/lib/media/constants";
import { API_PATHS } from "@/lib/api/endpoints";
import { type DataSource } from "@/types/dataSource";
import { type UploadGrant } from "@/types/media";

// The DataSource contract implemented against the app's API (app/api/*).
export function createApiSource(): DataSource {
  return {
    getCurrentUser: () => request(API_PATHS.me),
    getFeed: (tab) => request(API_PATHS.feed(tab)),
    getPost: (postId) => request(API_PATHS.post(postId)),
    getComments: (postId) => request(API_PATHS.comments(postId)),
    getUser: (handle) => request(API_PATHS.user(handle)),
    getUserPosts: (handle, tab) => request(API_PATHS.userPosts(handle, tab)),
    search: (query) => request(API_PATHS.search(query)),
    getTrends: () => request(API_PATHS.trends),
    getSuggestedPeople: (limit) => request(API_PATHS.suggestions(limit)),
    getNotifications: (filter) => request(API_PATHS.notifications(filter)),
    getConversations: () => request(API_PATHS.conversations),
    getConversation: (conversationId) =>
      request(API_PATHS.conversation(conversationId)),
    getUnreadCounts: () => request(API_PATHS.unread),
    getSettings: () => request(API_PATHS.settings),
    setLike: (postId, liked) =>
      request(API_PATHS.like(postId), { method: liked ? "PUT" : "DELETE" }),
    setRepost: (postId, reposted) =>
      request(API_PATHS.repost(postId), {
        method: reposted ? "PUT" : "DELETE",
      }),
    setFollow: (userId, following) =>
      request(API_PATHS.follow(userId), {
        method: following ? "PUT" : "DELETE",
      }),
    votePoll: (postId, optionId) =>
      request(API_PATHS.vote(postId), { method: "PUT", body: { optionId } }),
    createPost: (post) =>
      request(API_PATHS.posts, { method: "POST", body: post }),
    updatePost: (postId, text) =>
      request(API_PATHS.post(postId), { method: "PATCH", body: { text } }),
    deletePost: (postId) =>
      request(API_PATHS.post(postId), { method: "DELETE" }),
    addComment: (postId, text) =>
      request(API_PATHS.comments(postId), { method: "POST", body: { text } }),
    updateComment: (commentId, text) =>
      request(API_PATHS.comment(commentId), {
        method: "PATCH",
        body: { text },
      }),
    deleteComment: (commentId) =>
      request(API_PATHS.comment(commentId), { method: "DELETE" }),
    startConversation: (userId) =>
      request(API_PATHS.conversations, { method: "POST", body: { userId } }),
    sendMessage: (conversationId, text) =>
      request(API_PATHS.messages(conversationId), {
        method: "POST",
        body: { text },
      }),
    markNotificationsRead: () =>
      request(API_PATHS.notificationsRead, { method: "POST" }),
    markConversationRead: (conversationId) =>
      request(API_PATHS.conversationRead(conversationId), { method: "POST" }),
    updateProfile: (update) =>
      request(API_PATHS.me, { method: "PATCH", body: update }),
    setProfilePhoto: (kind, url) =>
      request(
        API_PATHS.photo(kind),
        url ? { method: "PUT", body: { url } } : { method: "DELETE" },
      ),
    // The API checks the file and grants a token; the file then goes straight to Blob.
    uploadMedia: async (file, purpose, options) => {
      const grant = await request<UploadGrant>(API_PATHS.uploads, {
        method: "POST",
        body: { purpose, contentType: file.type, size: file.size },
      });
      const url = await uploadToBlob(file, grant, options);
      return { url, kind: MEDIA_TYPES[file.type].kind };
    },
    updateSettings: (update) =>
      request(API_PATHS.settings, { method: "PATCH", body: update }),
  };
}
