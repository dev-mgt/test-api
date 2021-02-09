import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import * as posts from './data/posts.json'

@Injectable()
export class PostsService {
  posts: Post[]

  constructor() {
    this.posts = posts
  }

  create(createPostDto: CreatePostDto) {
    const lastPost = this.posts[this.posts.length - 1]
    const lastId = lastPost?.id || 1

    createPostDto.id = lastId

    this.posts = this.posts.concat(createPostDto)
    return createPostDto;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find(p => p.id === id);

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.findOne(id)

    Object.assign(post, updatePostDto)

    return post;
  }

  remove(id: number) {
    this.posts = this.posts.filter(post => post.id !== id)

    return { id };
  }
}
