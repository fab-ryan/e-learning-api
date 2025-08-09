'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">e-learning-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-47ac7341f8b8c7fbb7e2655c8f2f88ca43b8101d2399ca5c3862fa51b9e0faf96490cad8f52c7bf62c69ec847b6aa270d29fe317ece618b4bea4a09a02f3353f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-47ac7341f8b8c7fbb7e2655c8f2f88ca43b8101d2399ca5c3862fa51b9e0faf96490cad8f52c7bf62c69ec847b6aa270d29fe317ece618b4bea4a09a02f3353f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-47ac7341f8b8c7fbb7e2655c8f2f88ca43b8101d2399ca5c3862fa51b9e0faf96490cad8f52c7bf62c69ec847b6aa270d29fe317ece618b4bea4a09a02f3353f"' :
                                            'id="xs-controllers-links-module-AuthModule-47ac7341f8b8c7fbb7e2655c8f2f88ca43b8101d2399ca5c3862fa51b9e0faf96490cad8f52c7bf62c69ec847b6aa270d29fe317ece618b4bea4a09a02f3353f"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-47ac7341f8b8c7fbb7e2655c8f2f88ca43b8101d2399ca5c3862fa51b9e0faf96490cad8f52c7bf62c69ec847b6aa270d29fe317ece618b4bea4a09a02f3353f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-47ac7341f8b8c7fbb7e2655c8f2f88ca43b8101d2399ca5c3862fa51b9e0faf96490cad8f52c7bf62c69ec847b6aa270d29fe317ece618b4bea4a09a02f3353f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-47ac7341f8b8c7fbb7e2655c8f2f88ca43b8101d2399ca5c3862fa51b9e0faf96490cad8f52c7bf62c69ec847b6aa270d29fe317ece618b4bea4a09a02f3353f"' :
                                        'id="xs-injectables-links-module-AuthModule-47ac7341f8b8c7fbb7e2655c8f2f88ca43b8101d2399ca5c3862fa51b9e0faf96490cad8f52c7bf62c69ec847b6aa270d29fe317ece618b4bea4a09a02f3353f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoryModule-6b31a5929776847f15077c04b61a5c6b9d10fd61e0faff76015135b2f60ea4c90a8fea5eb760f3090d7aaa6d44efb310f2334ef270ef6fb7728484c4de202a7d"' : 'data-bs-target="#xs-controllers-links-module-CategoryModule-6b31a5929776847f15077c04b61a5c6b9d10fd61e0faff76015135b2f60ea4c90a8fea5eb760f3090d7aaa6d44efb310f2334ef270ef6fb7728484c4de202a7d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-6b31a5929776847f15077c04b61a5c6b9d10fd61e0faff76015135b2f60ea4c90a8fea5eb760f3090d7aaa6d44efb310f2334ef270ef6fb7728484c4de202a7d"' :
                                            'id="xs-controllers-links-module-CategoryModule-6b31a5929776847f15077c04b61a5c6b9d10fd61e0faff76015135b2f60ea4c90a8fea5eb760f3090d7aaa6d44efb310f2334ef270ef6fb7728484c4de202a7d"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoryModule-6b31a5929776847f15077c04b61a5c6b9d10fd61e0faff76015135b2f60ea4c90a8fea5eb760f3090d7aaa6d44efb310f2334ef270ef6fb7728484c4de202a7d"' : 'data-bs-target="#xs-injectables-links-module-CategoryModule-6b31a5929776847f15077c04b61a5c6b9d10fd61e0faff76015135b2f60ea4c90a8fea5eb760f3090d7aaa6d44efb310f2334ef270ef6fb7728484c4de202a7d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-6b31a5929776847f15077c04b61a5c6b9d10fd61e0faff76015135b2f60ea4c90a8fea5eb760f3090d7aaa6d44efb310f2334ef270ef6fb7728484c4de202a7d"' :
                                        'id="xs-injectables-links-module-CategoryModule-6b31a5929776847f15077c04b61a5c6b9d10fd61e0faff76015135b2f60ea4c90a8fea5eb760f3090d7aaa6d44efb310f2334ef270ef6fb7728484c4de202a7d"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoursesModule.html" data-type="entity-link" >CoursesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CoursesModule-276f238af368a7c20d22969874b75daa04b26e6251b248ce45516f5702e74d730f1d220d0b7ae8e59eac580d95755f63666c658120a4e0359d0f4278a0a9e274"' : 'data-bs-target="#xs-controllers-links-module-CoursesModule-276f238af368a7c20d22969874b75daa04b26e6251b248ce45516f5702e74d730f1d220d0b7ae8e59eac580d95755f63666c658120a4e0359d0f4278a0a9e274"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CoursesModule-276f238af368a7c20d22969874b75daa04b26e6251b248ce45516f5702e74d730f1d220d0b7ae8e59eac580d95755f63666c658120a4e0359d0f4278a0a9e274"' :
                                            'id="xs-controllers-links-module-CoursesModule-276f238af368a7c20d22969874b75daa04b26e6251b248ce45516f5702e74d730f1d220d0b7ae8e59eac580d95755f63666c658120a4e0359d0f4278a0a9e274"' }>
                                            <li class="link">
                                                <a href="controllers/CoursesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CoursesModule-276f238af368a7c20d22969874b75daa04b26e6251b248ce45516f5702e74d730f1d220d0b7ae8e59eac580d95755f63666c658120a4e0359d0f4278a0a9e274"' : 'data-bs-target="#xs-injectables-links-module-CoursesModule-276f238af368a7c20d22969874b75daa04b26e6251b248ce45516f5702e74d730f1d220d0b7ae8e59eac580d95755f63666c658120a4e0359d0f4278a0a9e274"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoursesModule-276f238af368a7c20d22969874b75daa04b26e6251b248ce45516f5702e74d730f1d220d0b7ae8e59eac580d95755f63666c658120a4e0359d0f4278a0a9e274"' :
                                        'id="xs-injectables-links-module-CoursesModule-276f238af368a7c20d22969874b75daa04b26e6251b248ce45516f5702e74d730f1d220d0b7ae8e59eac580d95755f63666c658120a4e0359d0f4278a0a9e274"' }>
                                        <li class="link">
                                            <a href="injectables/CoursesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DbModule.html" data-type="entity-link" >DbModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DefaultModule.html" data-type="entity-link" >DefaultModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DefaultModule-2aa933514022ea036436ccebd9ee5c23fb5478475f667cba7e13918b9ecca406135cead4c3c1c0bb3fed29a4e7e09c3cca4998fd60b1db9b824aa9ddeeceef97"' : 'data-bs-target="#xs-controllers-links-module-DefaultModule-2aa933514022ea036436ccebd9ee5c23fb5478475f667cba7e13918b9ecca406135cead4c3c1c0bb3fed29a4e7e09c3cca4998fd60b1db9b824aa9ddeeceef97"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DefaultModule-2aa933514022ea036436ccebd9ee5c23fb5478475f667cba7e13918b9ecca406135cead4c3c1c0bb3fed29a4e7e09c3cca4998fd60b1db9b824aa9ddeeceef97"' :
                                            'id="xs-controllers-links-module-DefaultModule-2aa933514022ea036436ccebd9ee5c23fb5478475f667cba7e13918b9ecca406135cead4c3c1c0bb3fed29a4e7e09c3cca4998fd60b1db9b824aa9ddeeceef97"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DefaultModule-2aa933514022ea036436ccebd9ee5c23fb5478475f667cba7e13918b9ecca406135cead4c3c1c0bb3fed29a4e7e09c3cca4998fd60b1db9b824aa9ddeeceef97"' : 'data-bs-target="#xs-injectables-links-module-DefaultModule-2aa933514022ea036436ccebd9ee5c23fb5478475f667cba7e13918b9ecca406135cead4c3c1c0bb3fed29a4e7e09c3cca4998fd60b1db9b824aa9ddeeceef97"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DefaultModule-2aa933514022ea036436ccebd9ee5c23fb5478475f667cba7e13918b9ecca406135cead4c3c1c0bb3fed29a4e7e09c3cca4998fd60b1db9b824aa9ddeeceef97"' :
                                        'id="xs-injectables-links-module-DefaultModule-2aa933514022ea036436ccebd9ee5c23fb5478475f667cba7e13918b9ecca406135cead4c3c1c0bb3fed29a4e7e09c3cca4998fd60b1db9b824aa9ddeeceef97"' }>
                                        <li class="link">
                                            <a href="injectables/DefaultService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EnrollsModule.html" data-type="entity-link" >EnrollsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EnrollsModule-4f7663dfba324cfd6b93e4ca7523101491526a7a965e4bf1709696bc1d711fd1b565a75a65b90ca606a5963023e9e94f46ab6718e10e658227812d400dbe6d0b"' : 'data-bs-target="#xs-controllers-links-module-EnrollsModule-4f7663dfba324cfd6b93e4ca7523101491526a7a965e4bf1709696bc1d711fd1b565a75a65b90ca606a5963023e9e94f46ab6718e10e658227812d400dbe6d0b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EnrollsModule-4f7663dfba324cfd6b93e4ca7523101491526a7a965e4bf1709696bc1d711fd1b565a75a65b90ca606a5963023e9e94f46ab6718e10e658227812d400dbe6d0b"' :
                                            'id="xs-controllers-links-module-EnrollsModule-4f7663dfba324cfd6b93e4ca7523101491526a7a965e4bf1709696bc1d711fd1b565a75a65b90ca606a5963023e9e94f46ab6718e10e658227812d400dbe6d0b"' }>
                                            <li class="link">
                                                <a href="controllers/EnrollsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnrollsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EnrollsModule-4f7663dfba324cfd6b93e4ca7523101491526a7a965e4bf1709696bc1d711fd1b565a75a65b90ca606a5963023e9e94f46ab6718e10e658227812d400dbe6d0b"' : 'data-bs-target="#xs-injectables-links-module-EnrollsModule-4f7663dfba324cfd6b93e4ca7523101491526a7a965e4bf1709696bc1d711fd1b565a75a65b90ca606a5963023e9e94f46ab6718e10e658227812d400dbe6d0b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EnrollsModule-4f7663dfba324cfd6b93e4ca7523101491526a7a965e4bf1709696bc1d711fd1b565a75a65b90ca606a5963023e9e94f46ab6718e10e658227812d400dbe6d0b"' :
                                        'id="xs-injectables-links-module-EnrollsModule-4f7663dfba324cfd6b93e4ca7523101491526a7a965e4bf1709696bc1d711fd1b565a75a65b90ca606a5963023e9e94f46ab6718e10e658227812d400dbe6d0b"' }>
                                        <li class="link">
                                            <a href="injectables/EnrollsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnrollsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/I18nConfigModule.html" data-type="entity-link" >I18nConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LessonsModule.html" data-type="entity-link" >LessonsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LessonsModule-6a0a386a750db9871327f0f8b5a55d20004562b7d393593e35b5fc0165b377df901945c9cb6febdc71e5243ccf8512a5ba8174fe431c56b9d7d91fa3fad2fc30"' : 'data-bs-target="#xs-controllers-links-module-LessonsModule-6a0a386a750db9871327f0f8b5a55d20004562b7d393593e35b5fc0165b377df901945c9cb6febdc71e5243ccf8512a5ba8174fe431c56b9d7d91fa3fad2fc30"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LessonsModule-6a0a386a750db9871327f0f8b5a55d20004562b7d393593e35b5fc0165b377df901945c9cb6febdc71e5243ccf8512a5ba8174fe431c56b9d7d91fa3fad2fc30"' :
                                            'id="xs-controllers-links-module-LessonsModule-6a0a386a750db9871327f0f8b5a55d20004562b7d393593e35b5fc0165b377df901945c9cb6febdc71e5243ccf8512a5ba8174fe431c56b9d7d91fa3fad2fc30"' }>
                                            <li class="link">
                                                <a href="controllers/LessonsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LessonsModule-6a0a386a750db9871327f0f8b5a55d20004562b7d393593e35b5fc0165b377df901945c9cb6febdc71e5243ccf8512a5ba8174fe431c56b9d7d91fa3fad2fc30"' : 'data-bs-target="#xs-injectables-links-module-LessonsModule-6a0a386a750db9871327f0f8b5a55d20004562b7d393593e35b5fc0165b377df901945c9cb6febdc71e5243ccf8512a5ba8174fe431c56b9d7d91fa3fad2fc30"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LessonsModule-6a0a386a750db9871327f0f8b5a55d20004562b7d393593e35b5fc0165b377df901945c9cb6febdc71e5243ccf8512a5ba8174fe431c56b9d7d91fa3fad2fc30"' :
                                        'id="xs-injectables-links-module-LessonsModule-6a0a386a750db9871327f0f8b5a55d20004562b7d393593e35b5fc0165b377df901945c9cb6febdc71e5243ccf8512a5ba8174fe431c56b9d7d91fa3fad2fc30"' }>
                                        <li class="link">
                                            <a href="injectables/LessonsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-b0a6cd8d34ce7616ec1081de8b86f07e172b78190abf28b10dcaceb82ffa76540749fb9cbc5eb70f0060908d387e5b5e274a37d2081c69ec01bd632b2fd51070"' : 'data-bs-target="#xs-injectables-links-module-MailModule-b0a6cd8d34ce7616ec1081de8b86f07e172b78190abf28b10dcaceb82ffa76540749fb9cbc5eb70f0060908d387e5b5e274a37d2081c69ec01bd632b2fd51070"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-b0a6cd8d34ce7616ec1081de8b86f07e172b78190abf28b10dcaceb82ffa76540749fb9cbc5eb70f0060908d387e5b5e274a37d2081c69ec01bd632b2fd51070"' :
                                        'id="xs-injectables-links-module-MailModule-b0a6cd8d34ce7616ec1081de8b86f07e172b78190abf28b10dcaceb82ffa76540749fb9cbc5eb70f0060908d387e5b5e274a37d2081c69ec01bd632b2fd51070"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrometheusModule.html" data-type="entity-link" >PrometheusModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PrometheusModule-dbe0795568fab053d48fb10d9623779b8af02264bf2e327c5f110dcf79bdb2e30a9e04730dd524f5f9f4c472537cc9d16acd1b8e4cc5627b0c355154a96de828"' : 'data-bs-target="#xs-controllers-links-module-PrometheusModule-dbe0795568fab053d48fb10d9623779b8af02264bf2e327c5f110dcf79bdb2e30a9e04730dd524f5f9f4c472537cc9d16acd1b8e4cc5627b0c355154a96de828"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PrometheusModule-dbe0795568fab053d48fb10d9623779b8af02264bf2e327c5f110dcf79bdb2e30a9e04730dd524f5f9f4c472537cc9d16acd1b8e4cc5627b0c355154a96de828"' :
                                            'id="xs-controllers-links-module-PrometheusModule-dbe0795568fab053d48fb10d9623779b8af02264bf2e327c5f110dcf79bdb2e30a9e04730dd524f5f9f4c472537cc9d16acd1b8e4cc5627b0c355154a96de828"' }>
                                            <li class="link">
                                                <a href="controllers/PrometheusController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrometheusController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrometheusModule-dbe0795568fab053d48fb10d9623779b8af02264bf2e327c5f110dcf79bdb2e30a9e04730dd524f5f9f4c472537cc9d16acd1b8e4cc5627b0c355154a96de828"' : 'data-bs-target="#xs-injectables-links-module-PrometheusModule-dbe0795568fab053d48fb10d9623779b8af02264bf2e327c5f110dcf79bdb2e30a9e04730dd524f5f9f4c472537cc9d16acd1b8e4cc5627b0c355154a96de828"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrometheusModule-dbe0795568fab053d48fb10d9623779b8af02264bf2e327c5f110dcf79bdb2e30a9e04730dd524f5f9f4c472537cc9d16acd1b8e4cc5627b0c355154a96de828"' :
                                        'id="xs-injectables-links-module-PrometheusModule-dbe0795568fab053d48fb10d9623779b8af02264bf2e327c5f110dcf79bdb2e30a9e04730dd524f5f9f4c472537cc9d16acd1b8e4cc5627b0c355154a96de828"' }>
                                        <li class="link">
                                            <a href="injectables/PrometheusService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrometheusService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuizModule.html" data-type="entity-link" >QuizModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-QuizModule-9f305fb53b441c6d3b3e05f0eea57578f5b8cfb8aeece6a66fa53a7554c5dc5748a0ff603679bacb6c16a7312e98c07f4d7df95754cb011777e43e21c7c8a232"' : 'data-bs-target="#xs-controllers-links-module-QuizModule-9f305fb53b441c6d3b3e05f0eea57578f5b8cfb8aeece6a66fa53a7554c5dc5748a0ff603679bacb6c16a7312e98c07f4d7df95754cb011777e43e21c7c8a232"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-QuizModule-9f305fb53b441c6d3b3e05f0eea57578f5b8cfb8aeece6a66fa53a7554c5dc5748a0ff603679bacb6c16a7312e98c07f4d7df95754cb011777e43e21c7c8a232"' :
                                            'id="xs-controllers-links-module-QuizModule-9f305fb53b441c6d3b3e05f0eea57578f5b8cfb8aeece6a66fa53a7554c5dc5748a0ff603679bacb6c16a7312e98c07f4d7df95754cb011777e43e21c7c8a232"' }>
                                            <li class="link">
                                                <a href="controllers/QuizController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuizController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-QuizModule-9f305fb53b441c6d3b3e05f0eea57578f5b8cfb8aeece6a66fa53a7554c5dc5748a0ff603679bacb6c16a7312e98c07f4d7df95754cb011777e43e21c7c8a232"' : 'data-bs-target="#xs-injectables-links-module-QuizModule-9f305fb53b441c6d3b3e05f0eea57578f5b8cfb8aeece6a66fa53a7554c5dc5748a0ff603679bacb6c16a7312e98c07f4d7df95754cb011777e43e21c7c8a232"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QuizModule-9f305fb53b441c6d3b3e05f0eea57578f5b8cfb8aeece6a66fa53a7554c5dc5748a0ff603679bacb6c16a7312e98c07f4d7df95754cb011777e43e21c7c8a232"' :
                                        'id="xs-injectables-links-module-QuizModule-9f305fb53b441c6d3b3e05f0eea57578f5b8cfb8aeece6a66fa53a7554c5dc5748a0ff603679bacb6c16a7312e98c07f4d7df95754cb011777e43e21c7c8a232"' }>
                                        <li class="link">
                                            <a href="injectables/QuizService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuizService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SharedModule-754eb71781d986612f1d52d5dc5aceb9d1ea82a996e90da3a4d0270ce82b9e6506b18d662b6acf2dbbbf4f86d6db0e028fd83db0cd32b2420093fd371f6b6842"' : 'data-bs-target="#xs-injectables-links-module-SharedModule-754eb71781d986612f1d52d5dc5aceb9d1ea82a996e90da3a4d0270ce82b9e6506b18d662b6acf2dbbbf4f86d6db0e028fd83db0cd32b2420093fd371f6b6842"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-754eb71781d986612f1d52d5dc5aceb9d1ea82a996e90da3a4d0270ce82b9e6506b18d662b6acf2dbbbf4f86d6db0e028fd83db0cd32b2420093fd371f6b6842"' :
                                        'id="xs-injectables-links-module-SharedModule-754eb71781d986612f1d52d5dc5aceb9d1ea82a996e90da3a4d0270ce82b9e6506b18d662b6acf2dbbbf4f86d6db0e028fd83db0cd32b2420093fd371f6b6842"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticateMiddleware.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticateMiddleware</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaginateHelper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginateHelper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserCategoryModule.html" data-type="entity-link" >UserCategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserCategoryModule-5dff5fa899aab71e6de2d0774e3a10251803f3c9f89cea9eee77720baab91a524294f7ac2e00518af214273a6efaa45477f5af50368d2d15b0bc8ab06dd63548"' : 'data-bs-target="#xs-controllers-links-module-UserCategoryModule-5dff5fa899aab71e6de2d0774e3a10251803f3c9f89cea9eee77720baab91a524294f7ac2e00518af214273a6efaa45477f5af50368d2d15b0bc8ab06dd63548"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserCategoryModule-5dff5fa899aab71e6de2d0774e3a10251803f3c9f89cea9eee77720baab91a524294f7ac2e00518af214273a6efaa45477f5af50368d2d15b0bc8ab06dd63548"' :
                                            'id="xs-controllers-links-module-UserCategoryModule-5dff5fa899aab71e6de2d0774e3a10251803f3c9f89cea9eee77720baab91a524294f7ac2e00518af214273a6efaa45477f5af50368d2d15b0bc8ab06dd63548"' }>
                                            <li class="link">
                                                <a href="controllers/UserCategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserCategoryModule-5dff5fa899aab71e6de2d0774e3a10251803f3c9f89cea9eee77720baab91a524294f7ac2e00518af214273a6efaa45477f5af50368d2d15b0bc8ab06dd63548"' : 'data-bs-target="#xs-injectables-links-module-UserCategoryModule-5dff5fa899aab71e6de2d0774e3a10251803f3c9f89cea9eee77720baab91a524294f7ac2e00518af214273a6efaa45477f5af50368d2d15b0bc8ab06dd63548"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserCategoryModule-5dff5fa899aab71e6de2d0774e3a10251803f3c9f89cea9eee77720baab91a524294f7ac2e00518af214273a6efaa45477f5af50368d2d15b0bc8ab06dd63548"' :
                                        'id="xs-injectables-links-module-UserCategoryModule-5dff5fa899aab71e6de2d0774e3a10251803f3c9f89cea9eee77720baab91a524294f7ac2e00518af214273a6efaa45477f5af50368d2d15b0bc8ab06dd63548"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticateMiddleware.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticateMiddleware</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserCategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-50b17bd5bf2903703fdfb11a84b90215a4be404284dc9299c3320d2b6331ab9d18846fb66a5b8aa6706bd7287076ce737218d159d2d4235461dfcf6fe9fe0d3f"' : 'data-bs-target="#xs-controllers-links-module-UserModule-50b17bd5bf2903703fdfb11a84b90215a4be404284dc9299c3320d2b6331ab9d18846fb66a5b8aa6706bd7287076ce737218d159d2d4235461dfcf6fe9fe0d3f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-50b17bd5bf2903703fdfb11a84b90215a4be404284dc9299c3320d2b6331ab9d18846fb66a5b8aa6706bd7287076ce737218d159d2d4235461dfcf6fe9fe0d3f"' :
                                            'id="xs-controllers-links-module-UserModule-50b17bd5bf2903703fdfb11a84b90215a4be404284dc9299c3320d2b6331ab9d18846fb66a5b8aa6706bd7287076ce737218d159d2d4235461dfcf6fe9fe0d3f"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-50b17bd5bf2903703fdfb11a84b90215a4be404284dc9299c3320d2b6331ab9d18846fb66a5b8aa6706bd7287076ce737218d159d2d4235461dfcf6fe9fe0d3f"' : 'data-bs-target="#xs-injectables-links-module-UserModule-50b17bd5bf2903703fdfb11a84b90215a4be404284dc9299c3320d2b6331ab9d18846fb66a5b8aa6706bd7287076ce737218d159d2d4235461dfcf6fe9fe0d3f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-50b17bd5bf2903703fdfb11a84b90215a4be404284dc9299c3320d2b6331ab9d18846fb66a5b8aa6706bd7287076ce737218d159d2d4235461dfcf6fe9fe0d3f"' :
                                        'id="xs-injectables-links-module-UserModule-50b17bd5bf2903703fdfb11a84b90215a4be404284dc9299c3320d2b6331ab9d18846fb66a5b8aa6706bd7287076ce737218d159d2d4235461dfcf6fe9fe0d3f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticateMiddleware.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticateMiddleware</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaginateHelper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginateHelper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResponseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/AnswerOption.html" data-type="entity-link" >AnswerOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Course.html" data-type="entity-link" >Course</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Enroll.html" data-type="entity-link" >Enroll</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Lesson.html" data-type="entity-link" >Lesson</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Question.html" data-type="entity-link" >Question</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Quiz.html" data-type="entity-link" >Quiz</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserCategory.html" data-type="entity-link" >UserCategory</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCourseDto.html" data-type="entity-link" >CreateCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLessonDto.html" data-type="entity-link" >CreateLessonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQuizDto.html" data-type="entity-link" >CreateQuizDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCategoryDto.html" data-type="entity-link" >CreateUserCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomExceptionFilter.html" data-type="entity-link" >CustomExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomResponseInterceptor.html" data-type="entity-link" >CustomResponseInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesDto.html" data-type="entity-link" >FilesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesDto-1.html" data-type="entity-link" >FilesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesDTO.html" data-type="entity-link" >FilesDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForgetPasswordDto.html" data-type="entity-link" >ForgetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImagePicDto.html" data-type="entity-link" >ImagePicDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IRequest.html" data-type="entity-link" >IRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/IResponseData.html" data-type="entity-link" >IResponseData</a>
                            </li>
                            <li class="link">
                                <a href="classes/Logger.html" data-type="entity-link" >Logger</a>
                            </li>
                            <li class="link">
                                <a href="classes/OTPDto.html" data-type="entity-link" >OTPDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileDto.html" data-type="entity-link" >ProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryFailedFilter.html" data-type="entity-link" >QueryFailedFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link" >ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseDto.html" data-type="entity-link" >ResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/swaggerConfig.html" data-type="entity-link" >swaggerConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCourseDto.html" data-type="entity-link" >UpdateCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLessonDto.html" data-type="entity-link" >UpdateLessonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateQuizDto.html" data-type="entity-link" >UpdateQuizDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserCategoryDto.html" data-type="entity-link" >UpdateUserCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationException.html" data-type="entity-link" >ValidationException</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccessContorlService.html" data-type="entity-link" >AccessContorlService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticateMiddleware.html" data-type="entity-link" >AuthenticateMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DefaultService.html" data-type="entity-link" >DefaultService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileRequestFilter.html" data-type="entity-link" >FileRequestFilter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link" >GoogleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LanguageMiddleware.html" data-type="entity-link" >LanguageMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginateHelper.html" data-type="entity-link" >PaginateHelper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseService.html" data-type="entity-link" >ResponseService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AssociativeArray.html" data-type="entity-link" >AssociativeArray</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Config.html" data-type="entity-link" >Config</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IsAuthorizedParams.html" data-type="entity-link" >IsAuthorizedParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link" >Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationResponse.html" data-type="entity-link" >ValidationResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationResponse-1.html" data-type="entity-link" >ValidationResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});