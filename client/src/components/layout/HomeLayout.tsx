import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { TextAlignCenterIcon } from "@radix-ui/react-icons";
import { Link, NavLink, Outlet } from "react-router-dom";
import assets from "@/assets";
import sideMenuItems, { App_Name } from "@/constants";
import { Fade, Slide } from "react-awesome-reveal";
const HomeLayout = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 w-[280px] fixed">
          <div className="flex h-14 items-center border-b py-4 px-4 lg:h-[60px] lg:px-6">
            <Slide direction="left">
              <Link to="/" className="flex items-center gap-1 font-semibold">
                <img
                  src={assets.images.logo}
                  width={40}
                  height={40}
                  alt={`${App_Name} logo`}
                  className="rounded-md mr-1"
                />
                <span className="text-[#898080]">{App_Name}</span>
              </Link>
            </Slide>
            <Button variant="link" size="icon" className="ml-auto h-8 w-8">
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto max-h-full">
            <nav className="grid gap-0 text-lg font-medium font-mono">
              {sideMenuItems.map((item, index) =>
                item.show ? (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between gap-3 px-3 py-2 transition-all",
                        isActive
                          ? "text-primary bg-muted "
                          : "text-muted-foreground hover:text-primary"
                      )
                    }
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        width={24}
                        height={24}
                        className="rounded"
                      />
                      {item.title}
                    </div>
                    {/* <ChevronRight /> */}
                  </NavLink>
                ) : null
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        <header
          className={`flex justify-between h-14 items-center fixed top-0 left-0 md:left-[280px] right-0 z-50 gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 ${
            scrolled ? "bg-opacity-90 border-b backdrop-blur-xl" : ""
          }`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <TextAlignCenterIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col overflow-y-auto max-h-full"
            >
              <Link
                to="/"
                className="flex items-center gap-2 font-semibold -mt-4"
              >
                <img
                  src={assets.images.logo}
                  width={40}
                  height={40}
                  alt={`${App_Name} logo`}
                  className="rounded-md mr-1"
                />
                <span className="text-[#898080]">{App_Name}</span>
              </Link>
              <nav className="grid gap-2 text-lg font-medium">
                {sideMenuItems.map((item, index) =>
                  item.show ? (
                    <NavLink
                      key={index}
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center justify-between gap-3 px-3 py-2 transition-all",
                          isActive
                            ? "text-primary bg-muted"
                            : "text-muted-foreground hover:text-primary"
                        )
                      }
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                        {item.title}
                      </div>
                      <ChevronRight />
                    </NavLink>
                  ) : null
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Fade cascade>
            <p>Welcome To Chart Dashboard</p>
          </Fade>

          <Slide direction="left">
            <div className="flex items-center gap-1">
              <img
                src={assets.images.profile}
                alt={App_Name}
                width={40}
                height={40}
                className="rounded"
              />
            </div>
          </Slide>
        </header>

        <main className="flex-1  p-4 px-4 lg:px-6 mt-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
