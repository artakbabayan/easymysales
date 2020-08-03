<script>
import MetisMenu from "metismenujs/dist/metismenujs";

export default {
    components: {},
    mounted: function () {
        const sidebarLayout = localStorage.getItem('sidebar-layout');
        switch (sidebarLayout) {
            case 'light-sidebar':
                this.lightSidebar();
                break;
            case 'compact-sidebar':
                this.compactSidebar();
                break;
            case 'icon-sidebar':
                this.iconSidebar();
                break;
            case 'colored-sidebar':
                this.coloredSidebar();
                break;
            case 'boxed-layout':
                this.boxedLayout();
                break;
            default:
                document.body.setAttribute("data-sidebar", "dark");
                break;
        }
        // eslint-disable-next-line no-unused-vars
        var menuRef = new MetisMenu("#side-menu");
        var links = document.getElementsByClassName("side-nav-link-ref");
        var matchingMenuItem = null;
        for (var i = 0; i < links.length; i++) {
            if (window.location.pathname === links[i].pathname) {
                matchingMenuItem = links[i];
                break;
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add("active");
            var parent = matchingMenuItem.parentElement;

            /**
             * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
             * We should come up with non hard coded approach
             */
            if (parent) {
                parent.classList.add("mm-active");
                const parent2 = parent.parentElement.closest("ul");
                if (parent2 && parent2.id !== "side-menu") {
                    parent2.classList.add("mm-show");

                    const parent3 = parent2.parentElement;
                    if (parent3) {
                        parent3.classList.add("mm-active");
                        var childAnchor = parent3.querySelector(".has-arrow");
                        var childDropdown = parent3.querySelector(".has-dropdown");
                        if (childAnchor) childAnchor.classList.add("mm-active");
                        if (childDropdown) childDropdown.classList.add("mm-active");

                        const parent4 = parent3.parentElement;
                        if (parent4) parent4.classList.add("mm-show");
                        const parent5 = parent4.parentElement;
                        if (parent5) parent5.classList.add("mm-active");
                    }
                }
            }
        }
    },
    methods: {
        defaultSidebar() {
            localStorage.setItem("sidebar-layout", 'default-sidebar');
            document.body.setAttribute("data-sidebar", "dark");
            document.body.removeAttribute("data-layout-size", "boxed");
            document.body.removeAttribute("data-sidebar-size", "small");
            document.body.removeAttribute("data-topbar", "small");
            document.body.classList.remove("vertical-collpsed");
        },
        lightSidebar() {
            localStorage.setItem("sidebar-layout", 'light-sidebar');
            document.body.setAttribute("data-topbar", "dark");
            document.body.removeAttribute("data-sidebar");
            document.body.removeAttribute("data-layout-size", "boxed");
            document.body.removeAttribute("data-sidebar-size", "small");
            document.body.classList.remove("vertical-collpsed");
        },
        compactSidebar() {
            localStorage.setItem("sidebar-layout", 'compact-sidebar');
            document.body.setAttribute("data-sidebar-size", "small");
            document.body.setAttribute("data-sidebar", "dark");
            document.body.removeAttribute("data-layout-size", "boxed");
            document.body.classList.remove("vertical-collpsed");
            document.body.removeAttribute("data-topbar", "dark");
        },
        iconSidebar() {
            localStorage.setItem("sidebar-layout", 'icon-sidebar');
            document.body.setAttribute("data-keep-enlarged", "true");
            document.body.classList.add("vertical-collpsed");
            document.body.setAttribute("data-sidebar", "dark");
            document.body.removeAttribute("data-topbar", "dark");
            document.body.removeAttribute("data-layout-size", "boxed");
        },
        boxedLayout() {
            localStorage.setItem("sidebar-layout", 'boxed-layout');
            document.body.setAttribute("data-keep-enlarged", "true");
            document.body.classList.add("vertical-collpsed");
            document.body.setAttribute("data-layout-size", "boxed");
            document.body.removeAttribute("data-sidebar", "colored");
            document.body.setAttribute("data-sidebar", "dark");
            document.body.removeAttribute("data-topbar", "dark");
        },
        coloredSidebar() {
            localStorage.setItem("sidebar-layout", 'colored-sidebar');
            document.body.setAttribute("data-sidebar", "colored");
            document.body.removeAttribute("data-layout-size", "boxed");
            document.body.removeAttribute("data-sidebar-size", "small");
            document.body.classList.remove("vertical-collpsed");
        }
    }
};
</script>

<template>
<!-- ========== Left Sidebar Start ========== -->

<!--- Sidemenu -->
<div id="sidebar-menu">
    <!-- Left Menu Start -->
    <ul id="side-menu" class="metismenu list-unstyled">
        <li class="menu-title">Menu</li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-home-circle"></i>
                <span class="badge badge-pill badge-info float-right">3</span>
                <span>Dashboards</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/" class="side-nav-link-ref">Default</a>
                </li>
                <li>
                    <a href="/dashboard/saas" class="side-nav-link-ref">Saas</a>
                </li>
                <li>
                    <a href="/dashboard/crypto" class="side-nav-link-ref">Crypto</a>
                </li>
            </ul>
        </li>
        
        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-layout"></i>
                <span>Layouts</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a
                    href="javascript:void(0);"
                    class="side-nav-link-ref"
                    @click="() => $root.changeLayout('horizontal')"
                    >Horizontal</a>
                </li>
                <li>
                    <a href="javascript: void(0);" class="side-nav-link-ref" @click="defaultSidebar">Default Sidebar</a>
                </li>
                <li>
                    <a href="javascript: void(0);" class="side-nav-link-ref" @click="lightSidebar">Light Sidebar</a>
                </li>
                <li>
                    <a href="javascript: void(0);" class="side-nav-link-ref" @click="compactSidebar">Compact Sidebar</a>
                </li>
                <li>
                    <a href="javascript: void(0);" class="side-nav-link-ref" @click="iconSidebar">Icon Sidebar</a>
                </li>
                <li>
                    <a href="javascript: void(0);" class="side-nav-link-ref" @click="boxedLayout">Boxed Layout</a>
                </li>
                <li>
                    <a href="javascript: void(0);" class="side-nav-link-ref" @click="coloredSidebar">Colored Sidebar</a>
                </li>
            </ul>
        </li>

        <li class="menu-title">Apps</li>

        <li>
            <a href="/calendar" class="side-nav-link-ref">
                <i class="bx bx-calendar"></i>
                <span>Calendar</span>
            </a>
        </li>
        <li>
            <a href="/chat" class="side-nav-link-ref">
                <i class="bx bx-chat"></i>
                <span class="badge badge-pill badge-success float-right">New</span>
                <span>Chat</span>
            </a>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-store"></i>
                <span>Ecommerce</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/ecommerce/products" class="side-nav-link-ref">Products</a>
                </li>
                <li>
                    <a href="/ecommerce/product-detail" class="side-nav-link-ref">Product Detail</a>
                </li>
                <li>
                    <a href="/ecommerce/orders" class="side-nav-link-ref">Orders</a>
                </li>
                <li>
                    <a href="/ecommerce/customers" class="side-nav-link-ref">Customers</a>
                </li>
                <li>
                    <a href="/ecommerce/cart" class="side-nav-link-ref">Cart</a>
                </li>
                <li>
                    <a href="/ecommerce/checkout" class="side-nav-link-ref">Checkout</a>
                </li>
                <li>
                    <a href="/ecommerce/shops" class="side-nav-link-ref">Shops</a>
                </li>
                <li>
                    <a href="/ecommerce/add-product" class="side-nav-link-ref">Add Product</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-bitcoin"></i>
                <span>Crypto</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/crypto/wallet" class="side-nav-link-ref">Wallet</a>
                </li>
                <li>
                    <a href="/crypto/buy-sell" class="side-nav-link-ref">Buy/Sell</a>
                </li>
                <li>
                    <a href="/crypto/lending" class="side-nav-link-ref">Lending</a>
                </li>
                <li>
                    <a href="/crypto/exchange" class="side-nav-link-ref">Exchange</a>
                </li>
                <li>
                    <a href="/crypto/orders" class="side-nav-link-ref">Orders</a>
                </li>
                <li>
                    <a href="/crypto/kyc-application" class="side-nav-link-ref">KYC Application</a>
                </li>
                <li>
                    <a href="/crypto/ico-landing" class="side-nav-link-ref">ICO Landing</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-envelope"></i>
                <span>Email</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/email/inbox" class="side-nav-link-ref">Inbox</a>
                </li>
                <li>
                    <a href="/email/reademail" class="side-nav-link-ref">Read Email</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-receipt"></i>
                <span>Invoices</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/invoices/list" class="side-nav-link-ref">Invoice List</a>
                </li>
                <li>
                    <a href="/invoices/detail" class="side-nav-link-ref">Invoice Detail</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-briefcase-alt-2"></i>
                <span>Projects</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/projects/grid" class="side-nav-link-ref">Projects Grid</a>
                </li>
                <li>
                    <a href="/projects/list" class="side-nav-link-ref">Projects List</a>
                </li>
                <li>
                    <a href="/projects/overview" class="side-nav-link-ref">Project Overview</a>
                </li>
                <li>
                    <a href="/projects/create" class="side-nav-link-ref">Create New</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-task"></i>
                <span>Tasks</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/tasks/list" class="side-nav-link-ref">Task List</a>
                </li>
                <li>
                    <a href="/tasks/kanban" class="side-nav-link-ref">Kanban Board</a>
                </li>
                <li>
                    <a href="/tasks/create" class="side-nav-link-ref">Create Task</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bxs-user-detail"></i>
                <span>Contacts</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/contacts/grid" class="side-nav-link-ref">User Grid</a>
                </li>
                <li>
                    <a href="/contacts/list" class="side-nav-link-ref">User List</a>
                </li>
                <li>
                    <a href="/contacts/profile" class="side-nav-link-ref">Profile</a>
                </li>
            </ul>
        </li>

        <li class="menu-title">Pages</li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-user-circle"></i>
                <span>Authentication</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/auth/login-1">Login</a>
                </li>
                <li>
                    <a href="/auth/register-1">Register</a>
                </li>
                <li>
                    <a href="/auth/recoverpw">Recover Password</a>
                </li>
                <li>
                    <a href="/auth/lock-screen">Lock Screen</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-file"></i>
                <span>Utility</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/pages/starter" class="side-nav-link-ref">Starter Page</a>
                </li>
                <li>
                    <a href="/pages/maintenance" class="side-nav-link-ref">Maintenance</a>
                </li>
                <li>
                    <a href="/pages/timeline" class="side-nav-link-ref">Timeline</a>
                </li>
                <li>
                    <a href="/pages/faqs" class="side-nav-link-ref">FAQs</a>
                </li>
                <li>
                    <a href="/pages/pricing" class="side-nav-link-ref">Pricing</a>
                </li>
                <li>
                    <a href="/pages/404" class="side-nav-link-ref">Error 404</a>
                </li>
                <li>
                    <a href="/pages/500" class="side-nav-link-ref">Error 500</a>
                </li>
            </ul>
        </li>

        <li class="menu-title">Components</li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-tone"></i>
                <span>UI Elements</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/ui/alerts" class="side-nav-link-ref">Alerts</a>
                </li>
                <li>
                    <a href="/ui/buttons" class="side-nav-link-ref">Buttons</a>
                </li>
                <li>
                    <a href="/ui/cards" class="side-nav-link-ref">Cards</a>
                </li>
                <li>
                    <a href="/ui/carousel" class="side-nav-link-ref">Carousel</a>
                </li>
                <li>
                    <a href="/ui/dropdowns" class="side-nav-link-ref">Dropdowns</a>
                </li>
                <li>
                    <a href="/ui/grid" class="side-nav-link-ref">Grid</a>
                </li>
                <li>
                    <a href="/ui/images" class="side-nav-link-ref">Images</a>
                </li>
                <li>
                    <a href="/ui/modals" class="side-nav-link-ref">Modals</a>
                </li>
                <li>
                    <a href="/ui/rangeslider" class="side-nav-link-ref">Range Slider</a>
                </li>
                <li>
                    <a href="/ui/progressbars" class="side-nav-link-ref">Progress Bars</a>
                </li>
                <li>
                    <a href="/ui/sweet-alert" class="side-nav-link-ref">Sweet-Alert</a>
                </li>
                <li>
                    <a href="/ui/tabs-accordions" class="side-nav-link-ref">Tabs & Accordions</a>
                </li>
                <li>
                    <a href="/ui/typography" class="side-nav-link-ref">Typography</a>
                </li>
                <li>
                    <a href="/ui/video" class="side-nav-link-ref">Video</a>
                </li>
                <li>
                    <a href="/ui/general" class="side-nav-link-ref">General</a>
                </li>
                <li>
                    <a href="/ui/colors" class="side-nav-link-ref">Colors</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-dropdown">
                <i class="bx bxs-eraser"></i>
                <span class="badge badge-pill badge-danger float-right">6</span>
                <span>Forms</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/form/elements" class="side-nav-link-ref">Form Elements</a>
                </li>
                <li>
                    <a href="/form/validation" class="side-nav-link-ref">Form Validation</a>
                </li>
                <li>
                    <a href="/form/advanced" class="side-nav-link-ref">Form Advanced</a>
                </li>
                <li>
                    <a href="/form/editor" class="side-nav-link-ref">Form Editor</a>
                </li>
                <li>
                    <a href="/form/uploads" class="side-nav-link-ref">Form File Upload</a>
                </li>
                <li>
                    <a href="/form/repeater" class="side-nav-link-ref">Form Repeater</a>
                </li>
                <li>
                    <a href="/form/wizard" class="side-nav-link-ref">Form Wizard</a>
                </li>
                <li>
                    <a href="/form/mask" class="side-nav-link-ref">Form Mask</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-list-ul"></i>
                <span>Tables</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/tables/basictable" class="side-nav-link-ref">Basic Tables</a>
                </li>
                <li>
                    <a href="/tables/advancedtable" class="side-nav-link-ref">Advanced Table</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bxs-bar-chart-alt-2"></i>
                <span>Charts</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/charts/apex" class="side-nav-link-ref">Apex Chart</a>
                </li>
                <li>
                    <a href="/charts/chartjs" class="side-nav-link-ref">Chartjs Chart</a>
                </li>
                <li>
                    <a href="/charts/chartist" class="side-nav-link-ref">Chartist Chart</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-aperture"></i>
                <span>Icons</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/icons/boxicons" class="side-nav-link-ref">Boxicons</a>
                </li>
                <li>
                    <a href="/icons/materialdesign" class="side-nav-link-ref">Material Design</a>
                </li>
                <li>
                    <a href="/icons/dripicons" class="side-nav-link-ref">Dripicons</a>
                </li>
                <li>
                    <a href="/icons/fontawesome" class="side-nav-link-ref">Font awesome</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-map"></i>
                <span>Maps</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <a href="/maps/google" class="side-nav-link-ref">Google Maps</a>
                </li>
            </ul>
        </li>

        <li>
            <a href="javascript: void(0);" class="has-arrow">
                <i class="bx bx-share-alt"></i>
                <span>Multi Level</span>
            </a>
            <ul class="sub-menu" aria-expanded="true">
                <li>
                    <a href="javascript: void(0);">Level 1.1</a>
                </li>
                <li>
                    <a href="javascript: void(0);" class="has-arrow">Level 1.2</a>
                    <ul class="sub-menu" aria-expanded="true">
                        <li>
                            <a href="javascript: void(0);">Level 2.1</a>
                        </li>
                        <li>
                            <a href="javascript: void(0);">Level 2.2</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
<!-- Sidebar -->
</template>