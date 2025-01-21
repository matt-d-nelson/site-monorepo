# Full-Stack Website Generator Project

**Backend Repository:** [View on GitHub](https://github.com/matt-d-nelson/site-be)

When I began to craft a website to showcase my various projects, I realized that a lot of what I was designing would be reusable for other similar websites. Also, my band needed a website... So, I created both sites as micro-frontends in a Nx monorepo so they could share components. They also share a monolith backend built with Nest.js. Each site has a unique id that is used to index styling data, component configurations, and facilitate CRUD operations for each page. The result is a Saas product where new custom websites can be spun up in a snap.

## What I Learned

### Custom Components

I've used bootstrap, materialUI, PrimeNg, and many more styling libs to build sites, but I felt that this project was a great opportunity to try my hand at engineering these from scratch. I'm glad I did, because I learned so much about managing global state with Angular services. Configuring the play/pause buttons to wire directly into an audio state service instead of relying on the html tag for playback was fun to build.

### Deep SVG Manipulation

Speaking of those audio buttons, did you know that if you have two svg paths with the same number of stops, you can animate them via css transitions alone? Go ahead and click play/pause and watch it in action. Pretty wild. I loved diving deeper into svg creation and animation. This site's background is also an animating svg...

### JSON Configured Components

An svg that is json configurable. Not every site should have this rad wavy background, but I knew that at least two would have it. So I made its colors configurable with json that is accessed via each site's unique id. This pattern is used all over the code base. For instance, most of the forms share a form dialog component that is configured with json.

### Angular 18

I also took this opportunity to learn and apply all the new Angular tooling. Primarily, signal based change detection. In previous versions, Angular used Zone.js to listen for state changes and then loop through all of the active component state looking for what changed. This wasn't all that performant so Angular introduced signals, fine grained state wrappers that will only trigger change detection in components that hold that state. It gives me hope for Angular's future <3.

### Nest/TypeOrm

Most of my backend projects up to this were a la carte node, but I wanted to try out a more comprehensive framework similar to what I worked with professionally: Django rest. I chose Nest because of my love for Rxjs and I was ok with the result. Sure, there is some magic under the hood with how TypeOrm is managing/querying the database that made me scratch my head, but at the end of the day, it works. I'd use Go with direct db management if I were to start again.

### DevOps

How does a person deploy a personal project these days? The free tiers are being wiped out, and my heart wouldn't be able to take seeing one of those "whoops" GCP or AWS bills. I went with the poverty stack of:

- Heroku BE (about $5 a month w/ postgres)
- Netlify FE (free and works great with Nx structure)
- Cloudinary storage (free up to a certain bandwith)

Figuring out how/where to deploy is the most stressful part for me, but I made it out with all my hair.

## Closing Thoughts

Thanks for checking this out. I hope you can tell that I had a blast creating this project. It is a testament to how I've grown as a developer over the last couple years. Can't wait for the next one ;)

## Technologies Used

### Frontend

- Angular
- Nx
- Tailwind
- Scss
- TypeScript
- Jest

### Backend

- Nest.js
- TypeOrm
- Postgres
- TypeScript
- Jest
- Passport
- Jwt

### Platform

- BE-Heroku
- FE-Netlify
- Storage-Cloudinary
