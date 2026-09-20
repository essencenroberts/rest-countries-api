import ThemeToggle from "./ThemeToggle";

//header component 
function Header() {
  
  return(
    <header className="bg-white dark:bg-dark-blue shadow-sm px-4 py-6 flex items-center justify-between">
    <h1 className="font-extrabold text-2xl md:text-2xl">Where in the world?</h1>
    
      <ThemeToggle />
    
    </header>
  )
}

export default Header;