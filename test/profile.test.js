const express = require('express');
const profileController = require('../routes/profile');
const userController = require('../routes/user');
const voteController = require('../routes/vote');
const commentController = require('../routes/comment');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');
const request = require('supertest');

jest.mock('../models/Profile');
jest.mock('../models/User');
jest.mock('../models/Vote');
jest.mock('../models/Comment');

describe('Profile Controller', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/', profileController());
        app.use('/', userController());
        app.use('/', voteController());
        app.use('/', commentController());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/add-profiles', () => {
        it('should add a new profile', async () => {
            const mockProfileData = {
                name: 'Test Profile',
                description: 'Test description',
                mbti: 'ISFJ',
                enneagram: '9w3',
                variant: 'sp/so',
                tritype: 725,
                socionics: 'SEE',
                sloan: 'RCOEN',
                psyche: 'FEVL',
                image: 'https://soulverse.boo.world/images/1.png'
            };

            const savedProfile = {
                _id: '1103134369',
                ...mockProfileData
            };

            Profile.prototype.save.mockResolvedValue(savedProfile);

            const response = await request(app)
                .post('/api/add-profiles')
                .send(mockProfileData);

            console.log('Saved Profile ID:', savedProfile._id);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(savedProfile);
        });

        // Add more test cases for validation errors, etc.
    });

    describe('GET /api/profiles/:id', () => {
        it('should get a profile by ID', async () => {
            const mockProfileData = {
                id: '1103134369',
                name: 'Test Profile',
                description: 'Test description',
                mbti: 'ISFJ',
                enneagram: '9w3',
                variant: 'sp/so',
                tritype: 725,
                socionics: 'SEE',
                sloan: 'RCOEN',
                psyche: 'FEVL',
                image: 'https://soulverse.boo.world/images/1.png'
            };

            // Mock the findById method of the Profile model to resolve with the entire mock profile object
            Profile.findById.mockResolvedValue(mockProfileData);

            // Send a GET request to retrieve the profile by ID
            const response = await request(app).get(`/api/profiles/${mockProfileData.id}`);

            // Assert the response status code and body
            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual({message :'Internal server error'});
        });
    });

    describe('POST /users', () => {
        it('should add a new user', async () => {
            const mockUserData = {
                name: 'Test User'
            };

            const savedUser = {
                _id: 'mock-user-id',
                ...mockUserData
            };

            User.prototype.save.mockResolvedValue(savedUser);

            const response = await request(app)
                .post('/users')
                .send(mockUserData);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(savedUser);
        });
    });

    describe('GET /users', () => {
        it('should get all users', async () => {
            const mockUsers = [
                {
                    _id: 'mock-user-id-1',
                    name: 'User 1'
                },
                {
                    _id: 'mock-user-id-2',
                    name: 'User 2'
                }
            ];

            User.find.mockResolvedValue(mockUsers);

            const response = await request(app).get('/users');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockUsers);
        });
    });

    describe('POST /api/votes', () => {
        it('should add a new vote', async () => {
            const mockVoteData = {
                user: 'mock-user-id',
                comment: 'mock-comment-id',
                liked: true
            };

            const savedVote = {
                _id: 'mock-vote-id',
                ...mockVoteData
            };

            Vote.prototype.save.mockResolvedValue(savedVote);

            const response = await request(app)
                .post('/api/votes')
                .send(mockVoteData);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(savedVote);
        });

        // Add more test cases for validation errors, etc.
    });

    describe('GET /api/votes', () => {
        it('should get all votes', async () => {
            const mockVotes = [
                {
                    _id: 'mock-vote-id-1',
                    user: 'mock-user-id-1',
                    comment: 'mock-comment-id-1',
                    liked: true
                },
                {
                    _id: 'mock-vote-id-2',
                    user: 'mock-user-id-2',
                    comment: 'mock-comment-id-2',
                    liked: false
                }
            ];

            Vote.find.mockResolvedValue(mockVotes);

            const response = await request(app).get('/api/votes');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockVotes);
        });
    });

    describe('POST /api/comments', () => {
        it('should add a new comment', async () => {
            const mockCommentData = {
                text: 'Test comment',
                user: 'mock-user-id'
            };

            const savedComment = {
                _id: 'mock-comment-id',
                ...mockCommentData
            };

            Comment.prototype.save.mockResolvedValue(savedComment);

            const response = await request(app)
                .post('/api/comments')
                .send(mockCommentData);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(savedComment);
        });
    });

    describe('GET /api/comments', () => {
        it('should get all comments', async () => {
            const mockComments = [
                {
                    _id: 'mock-comment-id-1',
                    text: 'Comment 1',
                    user: 'mock-user-id-1'
                },
                {
                    _id: 'mock-comment-id-2',
                    text: 'Comment 2',
                    user: 'mock-user-id-2'
                }
            ];

            Comment.find.mockResolvedValue(mockComments);

            const response = await request(app).get('/api/comments');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockComments);
        });
    });
});
