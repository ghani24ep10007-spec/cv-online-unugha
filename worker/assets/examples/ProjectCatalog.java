import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectCatalog {
    private static final class Project {
        private final String id;
        private final String title;
        private final String category;

        Project(String id, String title, String category) {
            this.id = id;
            this.title = title;
            this.category = category;
        }

        String getId() { return id; }
        String getTitle() { return title; }
        String getCategory() { return category; }
    }

    public static void main(String[] args) {
        List<Project> projects = Arrays.asList(
            new Project("SI-001", "Portal Informasi Akademik", "Sistem Informasi"),
            new Project("UI-002", "Perpustakaan Digital", "Antarmuka"),
            new Project("API-003", "Direktori Data Terbuka", "Data & API")
        );

        List<Project> sorted = projects.stream()
            .sorted(Comparator.comparing(Project::getId))
            .collect(Collectors.toList());

        System.out.println("Katalog Proyek Pemrograman Web");
        System.out.println("Jumlah contoh: " + sorted.size());
        sorted.forEach(project ->
            System.out.println(project.getId() + " | " + project.getTitle()));
    }
}
