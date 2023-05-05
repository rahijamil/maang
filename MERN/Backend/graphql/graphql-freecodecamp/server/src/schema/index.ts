import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import _ from 'lodash';

const books = [
    {
        id: "1",
        name: 'Harry Potter',
        genre: 'Fantasy',
        authorId: "1",
    },
    {
        id: "2",
        name: 'Jurassic Park',
        genre: 'Fantasy',
        authorId: "2",
    },
    {
        id: "3",
        name: 'The Lord of the Rings',
        genre: 'Sci-fi',
        authorId: "3",
    }
];

const authors = [
    {
        id: "1",
        name: 'J.K. Rowling',
        age: 44
    },
    {
        id: "2",
        name: 'R.R. Tolkien',
        age: 32
    },
    {
        id: "3",
        name: 'J.K. Rowling',
        age: 66
    }
];

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
    },
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        },
    },
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        }
    }
});

export default (new GraphQLSchema({
    query: RootQuery
}))