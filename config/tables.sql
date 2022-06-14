CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE publications (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id),
  text TEXT,
  link TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tag TEXT NOT NULL UNIQUE
);

CREATE TABLE "publicationsTags" (
    id SERIAL PRIMARY KEY,
    "publicationId" INTEGER NOT NULL REFERENCES publications(id),
    "tagId" INTEGER NOT NULL REFERENCES tags(id)
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "publicationId" INTEGER NOT NULL REFERENCES publications(id)
);

CREATE TABLE sessions (
   id SERIAL PRIMARY KEY,
   token TEXT NOT NULL UNIQUE,
   "userId" INTEGER NOT NULL REFERENCES users(id),
   "createdAt" TIMESTAMP DEFAULT NOW()
);
