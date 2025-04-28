package com.example.record;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{


        @Override
        public void addViewControllers(@NonNull ViewControllerRegistry registry) {

                /**
                 * restAPIとして扱う場合、パスの階層分だけaddViewControllerを設定する必要がある
                 * 
                 */
                registry.addViewController("/{spring:[^\\.]+}")
                        .setViewName("forward:/index.html");
                registry.addViewController("/{spring1:[^\\.]+}/{spring2:[^\\.]+}")
                        .setViewName("forward:/index.html");
                registry.addViewController("/{spring1:[^\\.]+}/{spring2:[^\\.]+}/{spring3:[^\\.]+}")
                        .setViewName("forward:/index.html");
        }
    
}
