
<template>
  <main class="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-8">
    <div class="p-24 md:order-1 hidden md:block">
      <img
        class="rounded-full transition-transform transform hover:scale-125"
        src="~/assets/img/hero.jpg"
        alt="飞船启动引擎"
        loading="eager"
        format="avif"
        width="512"
        height="512"
      />
    </div>

    <div>
      <h1 class="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight">
        使用 Nuxt 构建的营销网站
      </h1>
      <p class="text-lg mt-4 text-slate-600 max-w-xl">
        Nuxtship 是一个适用于初创公司、营销网站和着陆页的启动模板。<wbr /> 使用 Nuxt 和 TailwindCSS 构建。您可以快速创建任何网站。
      </p>
      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <LandingLink
          href="https://github.com/Gr33nW33n/nuxtship-template"
          target="_blank"
          rel="noopener"
          >开始使用</LandingLink
        >
        <LandingLink
          size="lg"
          styleName="outline"
          rel="noopener"
          href="https://github.com/Gr33nW33n/nuxtship-template"
          target="_blank"
          >查看仓库</LandingLink
        >
      </div>
    </div>
  </main>
</template>

