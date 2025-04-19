export interface NavItem {
  name: string,
  description: string,
  relativePath: string
}

export const navItems: NavItem[] = [
  {
    name: "Home",
    description: "Go to main page",
    relativePath: "/"
  },
  {
    name: "Courses",
    description: "Explore available coursec",
    relativePath: "/"
  },
  {
    name: "About",
    description: "Read about our platform",
    relativePath: "/"
  },
]

