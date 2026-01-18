"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { getUserDashboard, updateUser } from "@/lib/services/auth";
import { getUserPosts, deletePost } from "@/lib/services/posts";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { validateImageFile } from "@repo/validations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/Post";
import { Edit2, Trash2, User, FileText } from "lucide-react";

interface UserData {
  _id: string;
  username: string;
  email: string;
  avatar?: {
    url?: string;
    public_id?: string;
  };
}

interface UserFormData {
  username?: string;
  email?: string;
  password: string;
  newPassword?: string;
  avatar?: File | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);

  const [activeTab, setActiveTab] = useState<"profile" | "posts">("profile");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<UserFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      newPassword: "",
      avatar: null,
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Fetch user data and posts
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [dashboardData, posts] = await Promise.all([
          getUserDashboard(token!),
          getUserPosts(user.id, token!),
        ]);

        setUserData(dashboardData);
        setUserPosts(posts);
        if (dashboardData.avatar?.url) {
          setAvatarPreview(dashboardData.avatar.url);
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user, form]);

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      const validation = validateImageFile(file, 2);
      if (validation.error) {
        toast.error(validation.message || "Invalid image file");
        form.resetField("avatar");
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
        setAvatarPreview(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
      form.resetField("avatar");
    }
    form.setValue("avatar", file);
  };

  const onSubmit = async (data: UserFormData) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    setIsUpdating(true);

    try {
      const formData = new FormData();

      if (data.username) formData.append("username", data.username);
      if (data.email) formData.append("email", data.email);
      if (data.password) formData.append("password", data.password);
      if (data.newPassword) formData.append("newPassword", data.newPassword);
      if (data.avatar && data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }

      const result = await updateUser(formData, token!);

      // Update auth store
      if (result.user) {
        login({
          id: result.user._id || user?.id || "",
          username: result.user.username || userData?.username || "",
          email: result.user.email || userData?.email || "",
          image: result.user.avatar?.url || null,
        }, token!);
      }

      // Refresh user data
      const dashboardData = await getUserDashboard(token!);
      setUserData(dashboardData);
      if (dashboardData.avatar?.url) {
        setAvatarPreview(dashboardData.avatar.url);
      }

      toast.success("Profile updated successfully!");
      form.reset({
        username: "",
        email: "",
        password: "",
        newPassword: "",
        avatar: null,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeletePost = async (postId: string) => {

    try {
      await deletePost(postId, token!);
      setUserPosts(userPosts.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete post"
      );
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Hello {user?.username ?? "loading..."}!
        </h1>
        <p className="text-muted-foreground">Manage your profile and posts</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "profile"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="inline mr-2 h-4 w-4" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "posts"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="inline mr-2 h-4 w-4" />
          My Posts ({userPosts.length})
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <Card className="dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Update your account information and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Avatar */}
                <div className="space-y-4">
                  <Label>Avatar</Label>
                  <div className="flex items-center gap-4">
                    {avatarPreview ? (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2">
                        <Image
                          src={avatarPreview}
                          alt="Avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleAvatarChange(file);
                        }}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG, JPEG. Max 2MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter new username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter new email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Current Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password *</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Required to update your profile
                      </p>
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Posts Tab */}
      {activeTab === "posts" && (
        <div className="space-y-4">
          {userPosts.length === 0 ? (
            <Card className="dark:bg-slate-900">
              <CardContent className="py-12 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>You haven&apos;t created any posts yet.</p>
                <Link href="/write">
                  <Button variant="outline" className="mt-4">
                    Create Your First Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPosts.map((post) => (
                <Card key={post._id} className="relative dark:bg-slate-900">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {post.image?.url && (
                        <div className="relative w-full h-32 rounded-md overflow-hidden">
                          <Image
                            src={post.image.url}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Link href={`/post/${post._id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View
                          </Button>
                        </Link>
                        <Link href={`/write?edit=${post._id}`}>
                          <Button variant="outline" size="icon">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <Button
                              className="max-w-14 mx-auto mt-5"
                                variant="destructive"
                                onClick={() =>
                                  handleDeletePost(post._id)
                                }
                              >
                                Yes
                              </Button>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
