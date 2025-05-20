import { Logo } from "@/components/ui/logo"

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <Logo className="h-6 w-auto mb-2" />
            <p className="text-neutral-500 text-sm">Measure to Master</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>Documentation</li>
                <li>Tutorials</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Rapsodo GOLF. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="text-neutral-500 text-sm">Terms</span>
            <span className="text-neutral-500 text-sm">Privacy</span>
            <span className="text-neutral-500 text-sm">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
