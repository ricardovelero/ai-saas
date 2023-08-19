"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "Antonio",
    avatar: "A",
    title: "Software Engineer",
    description: "This is the best application I've used!",
  },
  {
    name: "Ricardo",
    avatar: "R",
    title: "Industrial Engineer",
    description: "Groovy!",
  },
  {
    name: "Ben",
    avatar: "B",
    title: "Futuristic Engineer",
    description: "This is the future, literally!",
  },
  {
    name: "Vanessa",
    avatar: "V",
    title: "Journalist, Writer",
    description: "It's fun to play with AI, yeap!",
  },
];

export default function LandingContent() {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
