package com.EatingTracker.back.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
/* 
@Configuration
public class DBConfig {

	@Autowired
	private ApplicationContext applicationContext;

	@Bean
	public DataSource dataSource() {
		try {
			var dbBuilder = new EmbeddedDatabaseBuilder();
			return dbBuilder.setType(EmbeddedDatabaseType.H2)
					.addScripts("file:/data/schema.sql")
					.build();
		} catch (Exception e) {

			return null;
		}
	}

}
	*/
