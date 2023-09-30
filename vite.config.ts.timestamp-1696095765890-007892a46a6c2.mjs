// vite.config.ts
import { fileURLToPath, URL } from "url";
import { defineConfig } from "file:///C:/Users/MOON/Workspace/thelab/atmosphere-ui/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/MOON/Workspace/thelab/atmosphere-ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/MOON/Workspace/thelab/atmosphere-ui/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";

// postcss.config.js
import tailwind from "file:///C:/Users/MOON/Workspace/thelab/atmosphere-ui/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/MOON/Workspace/thelab/atmosphere-ui/node_modules/autoprefixer/lib/autoprefixer.js";

// tailwind.config.js
var tailwind_config_default = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ec4899",
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843"
        },
        info: "#3D68F5",
        success: "#79E7AE",
        warning: "#D39E17",
        error: "#F61909"
      }
    }
  },
  plugins: []
};

// postcss.config.js
var postcss_config_default = {
  plugins: [tailwind(tailwind_config_default), autoprefixer]
};

// vite.config.ts
import dts from "file:///C:/Users/MOON/Workspace/thelab/atmosphere-ui/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/MOON/Workspace/thelab/atmosphere-ui/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      tsconfigPath: "tsconfig.build.json",
      cleanVueFileName: true
    })
  ],
  css: {
    postcss: postcss_config_default
  },
  build: {
    lib: {
      name: "atmosphere-ui",
      fileName: "index",
      entry: fileURLToPath(new URL("src/index.ts", __vite_injected_original_import_meta_url))
    },
    rollupOptions: {
      external: ["vue", "@vueuse/core"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  resolve: {
    alias: {
      "~/": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "~atoms": fileURLToPath(
        new URL("./src/components/atoms", __vite_injected_original_import_meta_url)
      ),
      "~molecules": fileURLToPath(
        new URL("./src/components/molecules", __vite_injected_original_import_meta_url)
      ),
      "~organisms": fileURLToPath(
        new URL("./src/components/organisms", __vite_injected_original_import_meta_url)
      ),
      "~templates": fileURLToPath(
        new URL("./src/components/templates", __vite_injected_original_import_meta_url)
      ),
      "~utils": fileURLToPath(new URL("./src/utils", __vite_injected_original_import_meta_url))
    }
  },
  test: {
    include: ["src/**/*.spec.*"],
    environment: "jsdom",
    globals: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicG9zdGNzcy5jb25maWcuanMiLCAidGFpbHdpbmQuY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTU9PTlxcXFxXb3Jrc3BhY2VcXFxcdGhlbGFiXFxcXGF0bW9zcGhlcmUtdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1PT05cXFxcV29ya3NwYWNlXFxcXHRoZWxhYlxcXFxhdG1vc3BoZXJlLXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9NT09OL1dvcmtzcGFjZS90aGVsYWIvYXRtb3NwaGVyZS11aS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJ1cmxcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcbmltcG9ydCBwb3N0Y3NzIGZyb20gXCIuL3Bvc3Rjc3MuY29uZmlnLmpzXCI7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSwgXG4gICAgdnVlSnN4KCksXG4gICAgZHRzKHtcbiAgICAgIHRzY29uZmlnUGF0aDogJ3RzY29uZmlnLmJ1aWxkLmpzb24nLFxuICAgICAgY2xlYW5WdWVGaWxlTmFtZTogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzcyxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIG5hbWU6IFwiYXRtb3NwaGVyZS11aVwiLFxuICAgICAgZmlsZU5hbWU6ICdpbmRleCcsXG4gICAgICBlbnRyeTogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwic3JjL2luZGV4LnRzXCIsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcInZ1ZVwiLCBcIkB2dWV1c2UvY29yZVwiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgdnVlOiBcIlZ1ZVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwifi9cIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICBcIn5hdG9tc1wiOiBmaWxlVVJMVG9QYXRoKFxuICAgICAgICBuZXcgVVJMKFwiLi9zcmMvY29tcG9uZW50cy9hdG9tc1wiLCBpbXBvcnQubWV0YS51cmwpXG4gICAgICApLFxuICAgICAgXCJ+bW9sZWN1bGVzXCI6IGZpbGVVUkxUb1BhdGgoXG4gICAgICAgIG5ldyBVUkwoXCIuL3NyYy9jb21wb25lbnRzL21vbGVjdWxlc1wiLCBpbXBvcnQubWV0YS51cmwpXG4gICAgICApLFxuICAgICAgXCJ+b3JnYW5pc21zXCI6IGZpbGVVUkxUb1BhdGgoXG4gICAgICAgIG5ldyBVUkwoXCIuL3NyYy9jb21wb25lbnRzL29yZ2FuaXNtc1wiLCBpbXBvcnQubWV0YS51cmwpXG4gICAgICApLFxuICAgICAgXCJ+dGVtcGxhdGVzXCI6IGZpbGVVUkxUb1BhdGgoXG4gICAgICAgIG5ldyBVUkwoXCIuL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlc1wiLCBpbXBvcnQubWV0YS51cmwpXG4gICAgICApLFxuICAgICAgXCJ+dXRpbHNcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmMvdXRpbHNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgdGVzdDoge1xuICAgIGluY2x1ZGU6IFtcInNyYy8qKi8qLnNwZWMuKlwiXSxcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIGdsb2JhbHM6IHRydWUsXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTU9PTlxcXFxXb3Jrc3BhY2VcXFxcdGhlbGFiXFxcXGF0bW9zcGhlcmUtdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1PT05cXFxcV29ya3NwYWNlXFxcXHRoZWxhYlxcXFxhdG1vc3BoZXJlLXVpXFxcXHBvc3Rjc3MuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9NT09OL1dvcmtzcGFjZS90aGVsYWIvYXRtb3NwaGVyZS11aS9wb3N0Y3NzLmNvbmZpZy5qc1wiO2ltcG9ydCB0YWlsd2luZCBmcm9tICd0YWlsd2luZGNzcydcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuaW1wb3J0IHRhaWx3aW5kQ29uZmlnIGZyb20gJy4vdGFpbHdpbmQuY29uZmlnLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcGx1Z2luczogW3RhaWx3aW5kKHRhaWx3aW5kQ29uZmlnKSwgYXV0b3ByZWZpeGVyXVxufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTU9PTlxcXFxXb3Jrc3BhY2VcXFxcdGhlbGFiXFxcXGF0bW9zcGhlcmUtdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE1PT05cXFxcV29ya3NwYWNlXFxcXHRoZWxhYlxcXFxhdG1vc3BoZXJlLXVpXFxcXHRhaWx3aW5kLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTU9PTi9Xb3Jrc3BhY2UvdGhlbGFiL2F0bW9zcGhlcmUtdWkvdGFpbHdpbmQuY29uZmlnLmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xuICBjb250ZW50OiBbXCIuL2luZGV4Lmh0bWxcIiwgXCIuL3NyYy8qKi8qLnt2dWUsanMsdHMsanN4LHRzeH1cIl0sXG4gIHRoZW1lOiB7XG4gICAgZXh0ZW5kOiB7XG4gICAgICBjb2xvcnM6IHtcbiAgICAgICAgcHJpbWFyeToge1xuICAgICAgICAgIERFRkFVTFQ6IFwiI2VjNDg5OVwiLFxuICAgICAgICAgIDUwOiBcIiNmZGYyZjhcIixcbiAgICAgICAgICAxMDA6IFwiI2ZjZTdmM1wiLFxuICAgICAgICAgIDIwMDogXCIjZmJjZmU4XCIsXG4gICAgICAgICAgMzAwOiBcIiNmOWE4ZDRcIixcbiAgICAgICAgICA0MDA6IFwiI2Y0NzJiNlwiLFxuICAgICAgICAgIDUwMDogXCIjZWM0ODk5XCIsXG4gICAgICAgICAgNjAwOiBcIiNkYjI3NzdcIixcbiAgICAgICAgICA3MDA6IFwiI2JlMTg1ZFwiLFxuICAgICAgICAgIDgwMDogXCIjOWQxNzRkXCIsXG4gICAgICAgICAgOTAwOiBcIiM4MzE4NDNcIixcbiAgICAgICAgfSxcbiAgICAgICAgaW5mbzogXCIjM0Q2OEY1XCIsXG4gICAgICAgIHN1Y2Nlc3M6IFwiIzc5RTdBRVwiLFxuICAgICAgICB3YXJuaW5nOiBcIiNEMzlFMTdcIixcbiAgICAgICAgZXJyb3I6IFwiI0Y2MTkwOVwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXSxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsZUFBZSxXQUFXO0FBQ3JXLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7OztBQ0hxVCxPQUFPLGNBQWM7QUFDN1YsT0FBTyxrQkFBa0I7OztBQ0RpVCxJQUFPLDBCQUFRO0FBQUEsRUFDdlYsU0FBUyxDQUFDLGdCQUFnQixnQ0FBZ0M7QUFBQSxFQUMxRCxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxJQUFJO0FBQUEsVUFDSixLQUFLO0FBQUEsVUFDTCxLQUFLO0FBQUEsVUFDTCxLQUFLO0FBQUEsVUFDTCxLQUFLO0FBQUEsVUFDTCxLQUFLO0FBQUEsVUFDTCxLQUFLO0FBQUEsVUFDTCxLQUFLO0FBQUEsVUFDTCxLQUFLO0FBQUEsVUFDTCxLQUFLO0FBQUEsUUFDUDtBQUFBLFFBQ0EsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDO0FBQ1o7OztBRHRCQSxJQUFPLHlCQUFRO0FBQUEsRUFDWCxTQUFTLENBQUMsU0FBUyx1QkFBYyxHQUFHLFlBQVk7QUFDcEQ7OztBRERBLE9BQU8sU0FBUztBQUwyTCxJQUFNLDJDQUEyQztBQVE1UCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixjQUFjO0FBQUEsTUFDZCxrQkFBa0I7QUFBQSxJQUNwQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixPQUFPLGNBQWMsSUFBSSxJQUFJLGdCQUFnQix3Q0FBZSxDQUFDO0FBQUEsSUFDL0Q7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxPQUFPLGNBQWM7QUFBQSxNQUNoQyxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUNyRCxVQUFVO0FBQUEsUUFDUixJQUFJLElBQUksMEJBQTBCLHdDQUFlO0FBQUEsTUFDbkQ7QUFBQSxNQUNBLGNBQWM7QUFBQSxRQUNaLElBQUksSUFBSSw4QkFBOEIsd0NBQWU7QUFBQSxNQUN2RDtBQUFBLE1BQ0EsY0FBYztBQUFBLFFBQ1osSUFBSSxJQUFJLDhCQUE4Qix3Q0FBZTtBQUFBLE1BQ3ZEO0FBQUEsTUFDQSxjQUFjO0FBQUEsUUFDWixJQUFJLElBQUksOEJBQThCLHdDQUFlO0FBQUEsTUFDdkQ7QUFBQSxNQUNBLFVBQVUsY0FBYyxJQUFJLElBQUksZUFBZSx3Q0FBZSxDQUFDO0FBQUEsSUFDakU7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTLENBQUMsaUJBQWlCO0FBQUEsSUFDM0IsYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLEVBQ1g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
