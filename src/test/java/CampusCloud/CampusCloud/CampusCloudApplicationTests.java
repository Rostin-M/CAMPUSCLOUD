package CampusCloud.CampusCloud;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
		"SPRING_DATASOURCE_USERNAME=campuscloud",
		"SPRING_DATASOURCE_PASSWORD=campuscloud"
})
class CampusCloudApplicationTests {

	@Test
	void contextLoads() {
	}

}
