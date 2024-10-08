import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
    "home", 
]);

const isPublicApiRoute = createRouteMatcher([
    "/api/video", 
]);

export default clerkMiddleware((auth, req) => {
        const{userId} = auth();
        const currentUrl = new URL(req.url);

        const isAccessingDashboard =  currentUrl.pathname === "/home";
        const isApiRequest =  currentUrl.pathname.startsWith("/api")

        //if user is logged in and accessing the public route but not the dashboard
        if(userId && isPublicRoute(req) && !isAccessingDashboard){
            return NextResponse.redirect(new URL("/home", req.url));
        }
        //not logged in
        if(!userId){
            //if not logged in and accessing protective route
            if(!isPublicRoute(req) && !isPublicApiRoute(req))
            {
            return NextResponse.redirect(new URL("/sign-in", req.url));
            }
            //if not logged in and request is for api route
            if(isApiRequest && !isPublicApiRoute(req)){
                return NextResponse.redirect(new URL("/sign-in", req.url));
            }
        }
        return NextResponse.next();
});
    
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  
}