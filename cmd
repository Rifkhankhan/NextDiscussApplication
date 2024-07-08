npm i @nextui-org/react framer-motion
npm install @prisma/client

npx  prisma init --datasource-provider sqlite
npx prisma migrate dev



# install auth

npm i --save-exact @auth/core@0.18.1 @auth/prisma-adapter@1.0.6 next-auth@5.0.0-beta.3


# to use hooks and events we can only do with in client component not server component
# if you want to use hooks and event for that we need to import client component into server comp
# for that define a client comp on top as 'use client' and import the file

# to use serverAction in client component directly it not allowed
# but we can define a file and on top put 'use server' and define the actions
# and import the action into client component

# when this importing the action into client component
# there are 2 ways to do
#  one is bind the action to pass the data
# other one is do the things as event handler